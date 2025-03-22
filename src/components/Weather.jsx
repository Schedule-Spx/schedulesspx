import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Weather = () => {
  const { currentTheme } = useTheme();
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // St. Pius X Catholic High School coordinates
  const [location, setLocation] = useState({ lat: 33.8467, lon: -84.3111 });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        
        // First get the forecast URL for the location
        const pointsResponse = await fetch(
          `https://api.weather.gov/points/${location.lat},${location.lon}`,
          { 
            headers: { 
              'User-Agent': '(schedulesspx.com, admin@schedulesspx.com)',
              'Accept': 'application/geo+json'
            }
          }
        );
        
        if (!pointsResponse.ok) {
          throw new Error('Failed to fetch location data');
        }
        
        const pointsData = await pointsResponse.json();
        const forecastUrl = pointsData.properties.forecast;
        const hourlyForecastUrl = pointsData.properties.forecastHourly;
        
        // Get the regular forecast
        const forecastResponse = await fetch(forecastUrl, {
          headers: { 
            'User-Agent': '(schedulesspx.com, admin@schedulesspx.com)',
            'Accept': 'application/geo+json'
          }
        });
        
        if (!forecastResponse.ok) {
          throw new Error('Failed to fetch forecast data');
        }
        
        const forecastData = await forecastResponse.json();
        
        // Also fetch hourly forecast
        const hourlyResponse = await fetch(hourlyForecastUrl, {
          headers: { 
            'User-Agent': '(schedulesspx.com, admin@schedulesspx.com)',
            'Accept': 'application/geo+json'
          }
        });
        
        if (!hourlyResponse.ok) {
          throw new Error('Failed to fetch hourly forecast');
        }
        
        const hourlyData = await hourlyResponse.json();
        
        // Get today's forecast periods (day and night)
        const todayPeriods = forecastData.properties.periods.slice(0, 2);
        
        // Extract high/low temperatures
        let highTemp = null;
        let lowTemp = null;
        
        todayPeriods.forEach(period => {
          if (period.isDaytime && highTemp === null) {
            highTemp = period.temperature;
          } else if (!period.isDaytime && lowTemp === null) {
            lowTemp = period.temperature;
          }
        });
        
        // Extract probability of precipitation if available
        const rainChance = todayPeriods[0].probabilityOfPrecipitation?.value || 0;
        
        // Get next 6 hours forecast
        const nextHours = hourlyData.properties.periods.slice(0, 6).map(period => {
          const hour = new Date(period.startTime).getHours();
          const hourDisplay = hour === 0 ? '12am' : hour === 12 ? '12pm' : hour > 12 ? `${hour-12}pm` : `${hour}am`;
          return {
            hour: hourDisplay,
            temp: period.temperature,
            icon: getWeatherIcon(period.shortForecast)
          };
        });
        
        setWeather({
          location: "St. Pius X",
          currentPeriod: forecastData.properties.periods[0],
          highTemp,
          lowTemp,
          rainChance
        });
        
        setHourlyForecast(nextHours);
        setError(null);
      } catch (err) {
        setError('Unable to fetch weather data');
        console.error('Weather API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    
    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [location]);

  // Weather condition icons
  const getWeatherIcon = (condition) => {
    const lowerCondition = condition?.toLowerCase() || '';
    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) return '☀️';
    if (lowerCondition.includes('cloud')) return '☁️';
    if (lowerCondition.includes('rain') || lowerCondition.includes('shower')) return '🌧️';
    if (lowerCondition.includes('snow') || lowerCondition.includes('flurr')) return '❄️';
    if (lowerCondition.includes('storm') || lowerCondition.includes('thunder')) return '⛈️';
    if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) return '🌫️';
    if (lowerCondition.includes('wind')) return '💨';
    return '🌡️';
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em]" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-xs mt-1">Loading weather...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-xs text-red-500">{error}</span>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="h-full w-full">
      {/* Current weather info - very slightly increased text size */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-3">
            <span className="text-[1.29rem] tracking-wide font-bold">{weather.currentPeriod.temperature}°</span>
            <span className="text-[0.89rem] leading-5 ml-1">{getWeatherIcon(weather.currentPeriod.shortForecast)}</span>
          </div>
          
          <div>
            <div className="text-[0.76rem] tracking-wide">
              <span className="font-medium">{weather.location}</span> • 
              {weather.currentPeriod.shortForecast}
            </div>
            <div className="text-[0.76rem] tracking-wide">
              H:{weather.highTemp}° L:{weather.lowTemp}° • 
              Wind: {weather.currentPeriod.windSpeed}
            </div>
          </div>
        </div>
        
        <div className="text-[0.76rem] font-semibold tracking-wide text-right">
          Rain: {weather.rainChance}%
        </div>
      </div>
      
      {/* Hourly forecast - very slightly increased text size */}
      <div className="mt-2.5">
        <div className="text-[0.76rem] tracking-wide font-medium mb-1">Today's Hourly Forecast</div>
        <div className="flex justify-between">
          {hourlyForecast.map((hour, index) => (
            <div key={index} className="text-center flex-1">
              <div className="text-[0.76rem] tracking-wide">{hour.hour}</div>
              <div className="text-[0.89rem] leading-5">{hour.icon}</div>
              <div className="text-[0.76rem] tracking-wide font-medium">{hour.temp}°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;

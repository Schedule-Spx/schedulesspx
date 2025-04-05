import React, { useState, useEffect, memo } from 'react';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const LOCATION = {
  lat: 33.8857,
  lon: -84.3063
};

// Memoized weather card component
const WeatherCard = memo(({ date, temp, description, high, low, theme, isToday }) => (
  <div className={`flex flex-col items-center w-1/3 p-4`}>
    <div className={`text-lg ${theme.text} opacity-75 mb-2`}>
      {isToday ? 'Today' : new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
    </div>
    <div className={`${isToday ? 'text-5xl' : 'text-4xl'} font-bold ${theme.text} mb-3`}>
      {Math.round(temp)}°F
    </div>
    <div className={`text-lg ${theme.text} mb-2 capitalize text-center`}>
      {description}
    </div>
    <div className={`text-base ${theme.text} opacity-75`}>
      H: {Math.round(high)}° L: {Math.round(low)}°
    </div>
    {isToday && (
      <div className={`text-sm ${theme.text} opacity-75 mt-2`}>
        Humidity: {Math.round(temp)}%
      </div>
    )}
  </div>
));

const WeatherDashboard = memo(() => {
  const { currentTheme } = useTheme();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get grid coordinates
        const pointsResponse = await axios.get(
          `https://api.weather.gov/points/${LOCATION.lat},${LOCATION.lon}`,
          {
            headers: {
              'User-Agent': '(schedulesspx.com, contact@schedulesspx.com)'
            }
          }
        );

        // Get hourly and daily forecasts
        const [hourlyResponse, forecastResponse] = await Promise.all([
          axios.get(pointsResponse.data.properties.forecastHourly, {
            headers: { 'User-Agent': '(schedulesspx.com, contact@schedulesspx.com)' }
          }),
          axios.get(pointsResponse.data.properties.forecast, {
            headers: { 'User-Agent': '(schedulesspx.com, contact@schedulesspx.com)' }
          })
        ]);

        // Current conditions
        const currentPeriod = hourlyResponse.data.properties.periods[0];
        
        // Get daily forecast (filtering for daytime periods only)
        const dailyForecasts = forecastResponse.data.properties.periods
          .filter(period => period.isDaytime)
          .slice(0, 4); // Get next 4 days including today

        setWeather({
          temperature: currentPeriod.temperature,
          description: currentPeriod.shortForecast,
          humidity: currentPeriod.relativeHumidity?.value || 'N/A',
          wind: currentPeriod.windSpeed,
          windDirection: currentPeriod.windDirection,
          high: dailyForecasts[0].temperature,
          low: forecastResponse.data.properties.periods[1].temperature // Night temperature
        });

        setForecast(dailyForecasts);

      } catch (error) {
        setError('Unable to fetch weather data');
        console.error('Weather fetch error:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className={`${currentTheme.text} text-center`}>{error}</p>
      </div>
    );
  }

  if (!weather || !forecast.length) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className={`${currentTheme.text} text-center`}>Loading weather...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center">
      {/* Weather cards in a row */}
      <div className="flex justify-between items-stretch">
        {forecast.slice(0, 3).map((day, index) => (
          <WeatherCard
            key={index}
            date={day.startTime}
            temp={day.temperature}
            description={day.shortForecast}
            high={day.temperature}
            low={forecast[index * 2 + 1]?.temperature || day.temperature}
            theme={currentTheme}
            isToday={index === 0}
          />
        ))}
      </div>
    </div>
  );
});

export default WeatherDashboard;

import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useWeekSchedule } from '../context/WeekScheduleContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import Schedule from '../components/Schedule';

const MarchMadness = () => {
  const { currentTheme } = useTheme();
  const { weekSchedule, isLoading, fetchSchedule } = useWeekSchedule(); // Add fetchSchedule

  // Add useEffect to fetch schedule on component mount
  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentPeriod, setCurrentPeriod] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
  
  // Add days of the week array
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Add new function to get the date for the selected day
  const getDateForDay = (dayName) => {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = today.getDay();
    const targetDayIndex = days.indexOf(dayName);
    const diff = targetDayIndex - currentDayIndex;
    
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
    
    // Format date as YYYYMMDD for ESPN API
    return targetDate.toISOString().split('T')[0].replace(/-/g, '');
  };

  // Fetch NCAA Tournament data from ESPN
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const dateStr = getDateForDay(selectedDay);
        const response = await axios.get(
          `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates=${dateStr}`
        );
        
        // Filter for tournament games (during tournament season)
        // During March Madness, the API should return tournament games
        // You may need to adjust this if the API structure changes
        const tournamentGames = response.data.events || [];
        setGames(tournamentGames);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch game data');
        setLoading(false);
        console.error('Error fetching game data:', err);
      }
    };

    fetchGames();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchGames, 30000);
    return () => clearInterval(interval);
  }, [selectedDay]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Calculate which period we're in based on current time
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeValue = hours * 60 + minutes; // minutes since midnight
      
      // Example periods (can be adjusted)
      const periods = [
        { name: "Before School", start: 0, end: 480 }, // 12am-8am
        { name: "Period 1", start: 480, end: 535 }, // 8:00-8:55
        { name: "Period 2", start: 535, end: 590 }, // 8:55-9:50
        { name: "Period 3", start: 590, end: 645 }, // 9:50-10:45
        { name: "Period 4", start: 645, end: 700 }, // 10:45-11:40
        { name: "Period 5", start: 700, end: 755 }, // 11:40-12:35
        { name: "Period 6", start: 755, end: 810 }, // 12:35-1:30
        { name: "Period 7", start: 810, end: 865 }, // 1:30-2:25
        { name: "Period 8", start: 865, end: 920 }, // 2:25-3:20
        { name: "After School", start: 920, end: 1440 } // 3:20pm-12am
      ];
      
      // Find current period
      const currentPeriodObj = periods.find(period => timeValue >= period.start && timeValue < period.end);
      
      if (currentPeriodObj) {
        setCurrentPeriod(currentPeriodObj.name);
        
        // Calculate progress percentage
        const periodDuration = currentPeriodObj.end - currentPeriodObj.start;
        const elapsed = timeValue - currentPeriodObj.start;
        const percent = Math.min(Math.round((elapsed / periodDuration) * 100), 100);
        setProgressPercent(percent);
      } else {
        setCurrentPeriod("Unknown");
        setProgressPercent(0);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM AM/PM
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  // Calculate time remaining until game start
  const getCountdown = (gameDate) => {
    const now = new Date();
    const gameTime = new Date(gameDate);
    const diff = gameTime - now;

    if (diff <= 0) return "Game Started";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  // Determine if a game is live
  const isGameLive = (game) => {
    return game.status && game.status.type && game.status.type.state === "in";
  };

  // Determine if a game is finished
  const isGameFinished = (game) => {
    return game.status && game.status.type && game.status.type.state === "post";
  };

  // Update renderGameItem for more compact display
  const renderGameItem = (game) => {
    if (!game) return null;

    const gameStatus = game.status?.type?.state || "pre";
    const homeTeam = game.competitions?.[0]?.competitors?.find(team => team.homeAway === "home");
    const awayTeam = game.competitions?.[0]?.competitors?.find(team => team.homeAway === "away");
    const time = game.status?.type?.shortDetail;
    const region = game.group?.abbreviation || "NCAA";

    return (
      <div className={`${currentTheme.accent} p-3 rounded-lg border ${currentTheme.border} h-full`}>
        <div className="flex justify-between items-center mb-2 text-sm">
          <div className="font-bold">{time}</div>
          <div>{region}</div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {homeTeam?.team?.logo && (
              <img 
                src={homeTeam.team.logo} 
                alt={homeTeam.team.location} 
                className="w-6 h-6"
              />
            )}
            <span className="text-sm font-semibold truncate">{homeTeam?.team?.location}</span>
            {gameStatus === "in" && (
              <span className="ml-auto font-bold">{homeTeam?.score}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {awayTeam?.team?.logo && (
              <img 
                src={awayTeam.team.logo} 
                alt={awayTeam.team.location} 
                className="w-6 h-6"
              />
            )}
            <span className="text-sm font-semibold truncate">{awayTeam?.team?.location}</span>
            {gameStatus === "in" && (
              <span className="ml-auto font-bold">{awayTeam?.score}</span>
            )}
          </div>
          {gameStatus === "in" && (
            <div className="text-center mt-1">
              <div className={`text-xs px-2 py-0.5 rounded bg-red-500 text-white animate-pulse inline-block`}>
                LIVE
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`h-screen flex flex-col ${currentTheme.main} ${currentTheme.text}`}>
      <div className="flex-1 min-h-0 p-4"> {/* min-h-0 is crucial for nested flex scrolling */}
        <div className="container mx-auto h-full flex flex-col">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl font-bold mb-4 ${currentTheme.text} text-center flex-none`}
          >
            March Madness 2025
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0"> {/* min-h-0 allows grid to scroll */}
            <div className={`md:col-span-2 ${currentTheme.secondary} border-2 ${currentTheme.border} p-4 rounded-lg flex flex-col`}>
              <div className="flex flex-wrap justify-center gap-2 mb-4 flex-none">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                      selectedDay === day 
                        ? `${currentTheme.accent} ${currentTheme.text} font-bold` 
                        : `${currentTheme.main} ${currentTheme.text} hover:${currentTheme.accent}`
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              
              <div className="overflow-y-auto flex-1 min-h-0"> {/* Scrollable games container */}
                {loading ? (
                  <div className="animate-pulse text-center p-4">Loading games...</div>
                ) : error ? (
                  <div className="text-red-500 text-center p-4">{error}</div>
                ) : games.length === 0 ? (
                  <div className="text-center p-4">No games scheduled for {selectedDay}</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-max">
                    {games.map((game, index) => (
                      <React.Fragment key={game.id || index}>
                        {renderGameItem(game)}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={`${currentTheme.secondary} border-2 ${currentTheme.border} p-4 rounded-lg flex flex-col`}>
              <h2 className="text-lg font-bold mb-4 flex-none">Today's Schedule</h2>
              <div className="overflow-y-auto flex-1 min-h-0"> {/* Scrollable schedule container */}
                {isLoading ? (
                  <div className="animate-pulse">Loading schedule...</div>
                ) : weekSchedule ? (
                  <Schedule weekSchedule={weekSchedule} compact={true} />
                ) : (
                  <div className="text-center p-4">Loading schedule data...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarchMadness;

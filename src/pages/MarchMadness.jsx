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
  const [rateLimited, setRateLimited] = useState(false);
  
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

  // Update the fetchDaySchedule function to only affect game selection
  const fetchDaySchedule = (day) => {
    setSelectedDay(day);
    // No longer calling fetchSchedule(day)
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
        
        // Reset rate limit flag on successful requests
        setRateLimited(false);
        
        // Filter for tournament games (during tournament season)
        // During March Madness, the API should return tournament games
        // You may need to adjust this if the API structure changes
        const tournamentGames = response.data.events.map(game => ({
          id: game.id,
          name: game.name,
          homeTeam: game.competitions[0].competitors.find(team => team.homeAway === 'home'),
          awayTeam: game.competitions[0].competitors.find(team => team.homeAway === 'away'),
          status: game.status.type.state,
          clock: game.status.displayClock,
          period: game.status.period,
          gameDate: game.date,
          gameTime: game.competitions[0]?.status?.type?.shortDetail,
          link: `https://www.espn.com/mens-college-basketball/game/_/gameId/${game.id}`
        })) || [];
        setGames(tournamentGames);
        setLoading(false);
      } catch (err) {
        // Check specifically for rate limit errors (HTTP 429)
        if (err.response && err.response.status === 429) {
          setRateLimited(true);
          setError('ESPN API rate limit reached. Try again later.');
        } else {
          setError('Failed to fetch game data');
        }
        setLoading(false);
        console.error('Error fetching game data:', err);
      }
    };

    fetchGames();
    // Refresh data more frequently (10 seconds instead of 30)
    // NOTE: Be cautious of ESPN API rate limits; too frequent requests might get blocked
    const interval = setInterval(fetchGames, 10000); // Changed from 30000 to 10000
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

  // Format game date function
  const formatGameDateTime = (game) => {
    if (!game.gameDate) return "TBD";
    
    const date = new Date(game.gameDate);
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    return `${formattedDate}, ${formattedTime}`;
  };

  // Calculate which periods a game occurs during
  const getGamePeriodInfo = (game) => {
    if (!game.gameDate) return "Time TBD";
    
    // Parse game date and calculate end time (3 hours later)
    const gameStartTime = new Date(game.gameDate);
    const gameEndTime = new Date(gameStartTime);
    gameEndTime.setHours(gameEndTime.getHours() + 3);
    
    // Convert to minutes since midnight for comparison with periods
    const gameStartMinutes = gameStartTime.getHours() * 60 + gameStartTime.getMinutes();
    const gameEndMinutes = gameEndTime.getHours() * 60 + gameEndTime.getMinutes();
    
    // School day boundaries (8am to 3:20pm)
    const schoolDayStart = 480; // 8:00 AM
    const schoolDayEnd = 920;   // 3:20 PM
    
    // Quick check - if the game is entirely outside school hours
    if (gameStartMinutes >= schoolDayEnd || gameEndMinutes <= schoolDayStart) {
      return "Doesn't Happen During School";
    }
    
    // Use the same periods array defined in the component
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
    
    // Find only school periods (excluding before/after school)
    const schoolPeriods = periods.filter(p => 
      p.name !== "Before School" && p.name !== "After School"
    );
    
    // Find first and last affected school periods
    let firstAffectedPeriod = null;
    let lastAffectedPeriod = null;
    
    for (const period of schoolPeriods) {
      // Check if this period overlaps with the game time
      if (gameStartMinutes < period.end && gameEndMinutes > period.start) {
        if (!firstAffectedPeriod) {
          firstAffectedPeriod = period;
        }
        lastAffectedPeriod = period;
      }
    }
    
    // If no school periods are affected, but the game overlaps with the school day
    if (!firstAffectedPeriod && gameStartMinutes < schoolDayEnd && gameEndMinutes > schoolDayStart) {
      // Game might overlap with before/after school only
      if (gameStartMinutes < schoolDayStart) {
        return "Happening before school starts";
      } else {
        return "Happening after school ends";
      }
    }
    
    // If no school periods are affected at all
    if (!firstAffectedPeriod) {
      return "Doesn't Happen During School";
    }
    
    // Game starts during school and continues past the end of school
    if (gameStartMinutes < schoolDayEnd && gameEndMinutes > schoolDayEnd) {
      const periodNum = parseInt(firstAffectedPeriod.name.split(" ")[1]);
      return `Happening from ${periodNum}${getOrdinal(periodNum)} period to after school`;
    }
    
    // Game is entirely within school hours
    const firstPeriodNum = parseInt(firstAffectedPeriod.name.split(" ")[1]);
    const lastPeriodNum = parseInt(lastAffectedPeriod.name.split(" ")[1]);
    
    return `Happening from ${firstPeriodNum}${getOrdinal(firstPeriodNum)} to ${lastPeriodNum}${getOrdinal(lastPeriodNum)} period`;
  };
  
  // Helper to extract period number
  const getPeriodNumber = (periodName) => {
    if (periodName.startsWith("Period ")) {
      return parseInt(periodName.replace("Period ", ""));
    }
    return null;
  };

  // Update the renderGames function to sort games and add special effects
  const renderGames = () => {
    if (loading) return <div className="text-center p-4">Loading games...</div>;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
    if (games.length === 0) return <div className="text-center p-4">No games scheduled for {selectedDay}</div>;

    // Sort games: close games at top, then in-progress, then upcoming, then finished at bottom
    const sortedGames = [...games].sort((a, b) => {
      // Helper function to check if a game is in crunch time (≤ 4 mins in 2nd half or OT)
      const isInCrunchTime = (game) => {
        if (game.status !== 'in') return false;
        
        // Check if it's second half (period 2) or overtime
        const isSecondHalfOrOT = game.period >= 2;
        
        // Convert clock (like "4:30") to minutes
        const clockParts = game.clock ? game.clock.split(':') : ['0', '00'];
        const clockMinutes = parseFloat(clockParts[0]) + (parseFloat(clockParts[1]) / 60);
        
        // Return true if in second half or OT with 4 minutes or less
        return isSecondHalfOrOT && clockMinutes <= 4;
      };

      // First put games in crunch time
      const aIsCrunchTime = isInCrunchTime(a);
      const bIsCrunchTime = isInCrunchTime(b);
      
      if (aIsCrunchTime && !bIsCrunchTime) return -1;
      if (!aIsCrunchTime && bIsCrunchTime) return 1;
      
      // Then sort by game state (in > pre > post)
      if (a.status !== b.status) {
        if (a.status === 'in') return -1;
        if (b.status === 'in') return 1;
        if (a.status === 'pre') return -1;
        if (b.status === 'pre') return 1;
      }

      // For games in progress, sort by time remaining (less time = higher priority)
      if (a.status === 'in' && b.status === 'in') {
        // Lower period number first
        if (a.period !== b.period) {
          return a.period - b.period;
        }
        
        // Less time remaining first (assuming clock format is MM:SS)
        const aTime = a.clock ? a.clock.split(':').reduce((m, s) => parseInt(m) * 60 + parseInt(s), 0) : 0;
        const bTime = b.clock ? b.clock.split(':').reduce((m, s) => parseInt(m) * 60 + parseInt(s), 0) : 0;
        return aTime - bTime;
      }
      
      // Default to original order
      return 0;
    });

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedGames.map(game => {
          // Determine winner and loser for completed games
          let homeIsWinner = false;
          let awayIsWinner = false;
          
          if (game.status === 'post' && game.homeTeam.score && game.awayTeam.score) {
            const homeScore = parseInt(game.homeTeam.score);
            const awayScore = parseInt(game.awayTeam.score);
            homeIsWinner = homeScore > awayScore;
            awayIsWinner = awayScore > homeScore;
          }
          
          // Check if game is in crunch time (≤ 4 mins in 2nd half)
          const isInCrunchTime = game.status === 'in' && 
                               game.period >= 2 && 
                               game.clock && 
                               parseFloat(game.clock.split(':')[0]) <= 4;
          
          // Get accurate period information
          const periodText = getGamePeriodInfo(game);
          
          return (
            <div 
              key={game.id}
              onClick={() => window.open(game.link, '_blank')}
              className={`${currentTheme.secondary} p-4 rounded-lg border-2 
                ${isInCrunchTime ? 'border-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.7)]' : currentTheme.border} 
                shadow-lg hover:scale-[1.02] transition-transform cursor-pointer
                ${game.status === 'post' ? 'opacity-80' : ''}`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold text-sm">
                  {game.status === 'in' ? (
                    <span className={isInCrunchTime ? 'text-red-500 font-bold' : ''}>LIVE</span>
                  ) : game.status === 'post' ? 'FINAL' : formatGameDateTime(game)}
                </div>
                {game.status === 'in' && (
                  <div className={`text-xs px-2 py-0.5 rounded ${isInCrunchTime ? 'bg-red-500 animate-pulse' : 'bg-orange-500'} text-white`}>
                    {game.clock} - {game.period <= 2 ? (game.period === 1 ? '1st Half' : '2nd Half') : `OT${game.period-2}`}
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={game.awayTeam.team.logo} 
                      alt={game.awayTeam.team.location}
                      className="w-6 h-6"
                    />
                    <span className={`
                      ${game.status === 'post' && awayIsWinner ? 'font-bold' : ''}
                      ${game.status === 'post' && !awayIsWinner ? 'text-red-500 line-through opacity-80' : ''}
                    `}>
                      {game.awayTeam.team.location}
                    </span>
                  </div>
                  <span className="font-bold text-lg">{game.awayTeam.score || '-'}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={game.homeTeam.team.logo} 
                      alt={game.homeTeam.team.location}
                      className="w-6 h-6"
                    />
                    <span className={`
                      ${game.status === 'post' && homeIsWinner ? 'font-bold' : ''}
                      ${game.status === 'post' && !homeIsWinner ? 'text-red-500 line-through opacity-80' : ''}
                    `}>
                      {game.homeTeam.team.location}
                    </span>
                  </div>
                  <span className="font-bold text-lg">{game.homeTeam.score || '-'}</span>
                </div>
                
                {/* Updated period information with accurate calculation */}
                <div className="text-xs text-center text-gray-500 pt-1 italic">
                  {periodText}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Helper function to add ordinal suffix (1st, 2nd, 3rd, etc.)
  const getOrdinal = (n) => {
    let ord = 'th';
    
    if (n % 10 === 1 && n % 100 !== 11) {
      ord = 'st';
    } else if (n % 10 === 2 && n % 100 !== 12) {
      ord = 'nd';
    } else if (n % 10 === 3 && n % 100 !== 13) {
      ord = 'rd';
    }
    
    return ord;
  };

  // Add new state to control the warning popup
  const [showWatchPopup, setShowWatchPopup] = useState(false);

  // Add function to handle the "Watch Live" button click
  const handleWatchLive = () => {
    setShowWatchPopup(true);
  };

  // Function to proceed to NCAA streaming
  const proceedToNCAA = () => {
    window.open('https://smart.link/c9upp9sl401to?cid=mml_partner_espn_generic', '_blank');
    setShowWatchPopup(false);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowWatchPopup(false);
  };

  return (
    <div className={`w-full h-full overflow-auto ${currentTheme.main} ${currentTheme.text}`}>
      {/* Rate limit popup alert */}
      {rateLimited && (
        <div className="fixed top-4 right-4 left-4 z-50 bg-red-600 text-white p-4 rounded-lg shadow-lg flex justify-between items-center">
          <div>
            <strong>API Rate Limit Reached!</strong> 
            <p className="text-sm">Too many requests to ESPN. Data updates paused temporarily.</p>
          </div>
          <button 
            onClick={() => setRateLimited(false)}
            className="bg-white text-red-600 px-2 py-1 rounded hover:bg-gray-100"
          >
            Dismiss
          </button>
        </div>
      )}
      
      {/* Watch Live Warning Popup */}
      {showWatchPopup && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4">
          <div className={`${currentTheme.secondary} rounded-lg p-6 max-w-md shadow-lg border-2 ${currentTheme.border}`}>
            <h3 className="text-xl font-bold mb-4">Entertainment Content Warning</h3>
            <p className="mb-6">
              By Proceding you agree that you are either in lunch, out of school, or have teacher permission to procede to the March Madness live game and understand ScheduleSPX has no responsibility in you getting introuble for being on entertainment instead of schoolwork.
            </p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={closePopup}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Nevermind
              </button>
              <button 
                onClick={proceedToNCAA}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                I understand, Proceed
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center md:text-left"
          >
            March Madness 2025
          </motion.h1>
          
          {/* Watch Live Now button */}
          <button
            onClick={handleWatchLive}
            className="mt-2 md:mt-0 px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            Watch Live Now
          </button>
        </div>

        {/* Day selector with updated onClick handler */}
        <div className={`${currentTheme.secondary} border-2 ${currentTheme.border} rounded-lg p-4 mb-4 shadow-md`}>
          <h3 className="text-lg font-bold mb-2 text-center">Select Day</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => fetchDaySchedule(day)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedDay === day 
                    ? `${currentTheme.accent} font-bold` 
                    : `bg-opacity-70 hover:opacity-80`
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Games section with clear outline/border */}
          <div className={`md:col-span-2 ${currentTheme.secondary} border-2 ${currentTheme.border} rounded-lg shadow-md`}>
            <div className={`p-2 ${currentTheme.accent} border-b-2 ${currentTheme.border}`}>
              <h2 className="text-lg font-bold text-center">Games for {selectedDay}</h2>
            </div>
            <div className="p-4">
              {renderGames()}
            </div>
          </div>

          {/* Schedule section with matching style */}
          <div className={`${currentTheme.secondary} border-2 ${currentTheme.border} rounded-lg shadow-md`}>
            <div className={`p-2 ${currentTheme.accent} border-b-2 ${currentTheme.border}`}>
              <h2 className="text-lg font-bold text-center">Today's Schedule</h2>
            </div>
            <div className="p-4">
              {isLoading ? (
                <div className="animate-pulse">Loading schedule...</div>
              ) : weekSchedule ? (
                <Schedule 
                  weekSchedule={weekSchedule} 
                  compact={true}
                />
              ) : (
                <div className="text-center p-4">No schedule data available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarchMadness;

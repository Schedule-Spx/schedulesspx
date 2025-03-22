import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useWeekSchedule } from '../context/WeekScheduleContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import Schedule from '../components/Schedule';

const MarchMadness = () => {
  const { currentTheme } = useTheme();
  const { weekSchedule, isLoading, fetchSchedule } = useWeekSchedule();

  // Add useEffect to fetch schedule on component mount
  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  // Used in the useEffect timer for displaying time info
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPeriod, setCurrentPeriod] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
  const [rateLimited, setRateLimited] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
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

  // Add scroll to top function when changing days
  const scrollToTop = () => {
    const contentArea = document.querySelector('.fixed-content');
    if (contentArea) {
      contentArea.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Add skeleton loading component for games
  const GameSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`${currentTheme.secondary} p-4 rounded-lg border-2 ${currentTheme.border} shadow-lg animate-pulse`}>
          <div className="flex justify-between items-center mb-2">
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
              <div className="h-6 bg-gray-300 rounded w-8"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
              <div className="h-6 bg-gray-300 rounded w-8"></div>
            </div>
            <div className="h-3 bg-gray-300 rounded w-full mx-auto mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Update the fetchDaySchedule function
  const fetchDaySchedule = (day) => {
    setSelectedDay(day);
    setTimeout(scrollToTop, 100);
  };

  // Fetch NCAA Tournament data from ESPN
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Only show full loading on initial fetch, not on refreshes
        if (games.length === 0) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }
        
        const dateStr = getDateForDay(selectedDay);
        const response = await axios.get(
          `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates=${dateStr}`
        );
        
        // Reset rate limit flag on successful requests
        setRateLimited(false);
        
        // Filter for tournament games
        const tournamentGames = response.data.events.map(game => ({
          id: game.id,
          name: game.name,
          homeTeam: {
            ...game.competitions[0].competitors.find(team => team.homeAway === 'home'),
            seed: game.competitions[0].competitors.find(team => team.homeAway === 'home')?.curatedRank?.current
          },
          awayTeam: {
            ...game.competitions[0].competitors.find(team => team.homeAway === 'away'),
            seed: game.competitions[0].competitors.find(team => team.homeAway === 'away')?.curatedRank?.current
          },
          status: game.status.type.state,
          clock: game.status.displayClock,
          period: game.status.period,
          gameDate: game.date,
          gameTime: game.competitions[0]?.status?.type?.shortDetail,
          link: `https://www.espn.com/mens-college-basketball/game/_/gameId/${game.id}`
        })) || [];
        
        setGames(tournamentGames);
        setLoading(false);
        setRefreshing(false);
      } catch (err) {
        // Check specifically for rate limit errors (HTTP 429)
        if (err.response && err.response.status === 429) {
          setRateLimited(true);
          setError('ESPN API rate limit reached. Try again later.');
        } else {
          setError('Failed to fetch game data');
        }
        setLoading(false);
        setRefreshing(false);
        console.error('Error fetching game data:', err);
      }
    };

    fetchGames();
    // Refresh data more frequently (10 seconds instead of 30)
    const interval = setInterval(fetchGames, 10000);
    return () => clearInterval(interval);
  }, [selectedDay]);

  // Update time every second
  useEffect(() => {
    const formatTimeRemaining = (ms) => {
      const seconds = Math.floor(ms / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
      if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
      if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
      return `${seconds}s`;
    };

    const updateTitle = (status, time) => {
      document.title = time ? `${status} - ${time}` : 'Schedule-SPX';
    };

    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    const getNextSchoolDay = (currentDay) => {
      let nextDay = DAYS[(DAYS.indexOf(currentDay) + 1) % 7];
      let count = 0;
      while (!weekSchedule[nextDay] && count < 7) {
        nextDay = DAYS[(DAYS.indexOf(nextDay) + 1) % 7];
        count++;
      }
      return count < 7 ? nextDay : null;
    };

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
      const todaySchedule = weekSchedule[currentDay];
      
      if (Array.isArray(todaySchedule) && todaySchedule.length > 0) {
        // School day handling
        const parseTime = (timeString) => {
          if (!timeString) return null;
          const [time, modifier] = timeString.split(' ');
          let [hours, minutes] = time.split(':').map(Number);
          if (modifier?.toLowerCase() === 'pm' && hours !== 12) hours += 12;
          else if (modifier?.toLowerCase() === 'am' && hours === 12) hours = 0;
          return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        };
        
        // Find if we're in a period
        const currentPeriodInfo = todaySchedule.find(period => {
          const [, time] = period.split(' - ');
          const [start, end] = time.split('-').map(t => parseTime(t.trim()));
          return start && end && now >= start && now < end;
        });

        if (currentPeriodInfo) {
          // Active period
          const [name, time] = currentPeriodInfo.split(' - ');
          const [, end] = time.split('-').map(t => parseTime(t.trim()));
          const remaining = end - now;
          
          setCurrentPeriod(name);
          updateTitle(name, formatTimeRemaining(remaining));
        } else {
          // Check if we're between periods, before school, or after school
          const nextPeriod = todaySchedule.find(period => {
            const startTime = parseTime(period.split(' - ')[1].split('-')[0].trim());
            return startTime && now < startTime;
          });
          
          if (nextPeriod) {
            // Between periods or before school
            const [nextPeriodName, nextPeriodTime] = nextPeriod.split(' - ');
            const nextPeriodStart = parseTime(nextPeriodTime.split('-')[0].trim());
            const timeUntilNext = nextPeriodStart - now;
            
            if (todaySchedule.indexOf(nextPeriod) === 0) {
              // Before first period (school hasn't started)
              setCurrentPeriod("Before School");
              updateTitle('School starts in', formatTimeRemaining(timeUntilNext));
            } else {
              // Between periods
              setCurrentPeriod(`Next: ${nextPeriodName}`);
              updateTitle(`Next: ${nextPeriodName}`, formatTimeRemaining(timeUntilNext));
            }
          } else {
            // After school
            const nextDay = getNextSchoolDay(currentDay);
            setCurrentPeriod("After School");
            
            if (nextDay) {
              updateTitle('Next school day', nextDay);
            } else {
              updateTitle('No School', '');
            }
          }
        }
      } else {
        // Non-school day
        const nextDay = getNextSchoolDay(currentDay);
        
        if (nextDay) {
          setCurrentPeriod("No school today");
          updateTitle('Next school day', nextDay);
        } else {
          setCurrentPeriod("No School");
          updateTitle('No School', '');
        }
      }
    }, 1000);
    
    return () => {
      clearInterval(timer);
      document.title = "ScheduleSPX";
    };
  }, [weekSchedule]);

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

  // Update the renderGames function to sort games and add special effects
  const renderGames = () => {
    if (loading && games.length === 0) return <GameSkeleton />;
    if (error && games.length === 0) return <div className="text-center p-4 text-red-500">{error}</div>;
    if (games.length === 0 && !loading) return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="text-xl font-semibold">No games scheduled for {selectedDay}</p>
        <p className="text-gray-500 mt-2">Try selecting a different day</p>
      </div>
    );

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
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${refreshing ? 'opacity-70' : ''}`}>
        {/* Show a subtle refresh indicator if refreshing */}
        {refreshing && (
          <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs shadow-lg z-30 animate-pulse">
            Updating...
          </div>
        )}
        
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
            <motion.div 
              key={game.id}
              onClick={() => window.open(game.link, '_blank')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`${currentTheme.secondary} p-4 rounded-lg border-2 
                ${isInCrunchTime ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)]' : currentTheme.border} 
                shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer
                ${game.status === 'post' ? 'opacity-80' : ''} relative group`}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              {/* Add a crunch time pulse effect */}
              {isInCrunchTime && (
                <div className="absolute inset-0 rounded-lg bg-red-500 opacity-10 animate-pulse"></div>
              )}
            
              {/* Hover tooltip */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10 backdrop-blur-sm">
                <div className="text-white text-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <p className="font-bold text-lg">View on ESPN</p>
                  <p className="text-sm mt-1 text-gray-200">Full stats and play-by-play</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <div className="font-bold text-sm">
                  {game.status === 'in' ? (
                    <span className={`${isInCrunchTime ? 'text-red-500 font-bold' : ''} flex items-center`}>
                      <span className={`h-2 w-2 rounded-full ${isInCrunchTime ? 'bg-red-500' : 'bg-green-500'} mr-2 ${isInCrunchTime ? 'animate-pulse' : ''}`}></span>
                      LIVE
                    </span>
                  ) : game.status === 'post' ? (
                    <span className="text-gray-500">FINAL</span>
                  ) : formatGameDateTime(game)}
                </div>
                {game.status === 'in' && (
                  <div className={`text-xs px-2 py-1 rounded-full ${isInCrunchTime ? 'bg-red-500 animate-pulse' : 'bg-green-500'} text-white font-medium`}>
                    {game.clock} - {game.period <= 2 ? (game.period === 1 ? '1st Half' : '2nd Half') : `OT${game.period-2}`}
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className={`flex items-center justify-between p-2 rounded ${game.status === 'post' && awayIsWinner ? 'bg-opacity-10 bg-green-500' : ''}`}>
                  <div className="flex items-center gap-2">
                    {/* Add seed for away team */}
                    {game.awayTeam.seed && (
                      <span className="font-bold text-xs bg-gray-200 text-gray-800 rounded-full w-5 h-5 flex items-center justify-center">
                        {game.awayTeam.seed}
                      </span>
                    )}
                    <img 
                      src={game.awayTeam.team.logo} 
                      alt={game.awayTeam.team.location}
                      className="w-7 h-7 object-contain"
                    />
                    <span className={`font-medium
                      ${game.status === 'post' && awayIsWinner ? 'font-bold' : ''}
                      ${game.status === 'post' && !awayIsWinner ? 'text-gray-500' : ''}
                    `}>
                      {game.awayTeam.team.location}
                    </span>
                  </div>
                  <span className={`font-bold text-lg ${game.status === 'post' && awayIsWinner ? 'text-green-600' : ''}`}>
                    {game.awayTeam.score || '-'}
                  </span>
                </div>
                
                <div className={`flex items-center justify-between p-2 rounded ${game.status === 'post' && homeIsWinner ? 'bg-opacity-10 bg-green-500' : ''}`}>
                  <div className="flex items-center gap-2">
                    {/* Add seed for home team */}
                    {game.homeTeam.seed && (
                      <span className="font-bold text-xs bg-gray-200 text-gray-800 rounded-full w-5 h-5 flex items-center justify-center">
                        {game.homeTeam.seed}
                      </span>
                    )}
                    <img 
                      src={game.homeTeam.team.logo} 
                      alt={game.homeTeam.team.location}
                      className="w-7 h-7 object-contain"
                    />
                    <span className={`font-medium
                      ${game.status === 'post' && homeIsWinner ? 'font-bold' : ''}
                      ${game.status === 'post' && !homeIsWinner ? 'text-gray-500' : ''}
                    `}>
                      {game.homeTeam.team.location}
                    </span>
                  </div>
                  <span className={`font-bold text-lg ${game.status === 'post' && homeIsWinner ? 'text-green-600' : ''}`}>
                    {game.homeTeam.score || '-'}
                  </span>
                </div>
                
                {/* Updated period information with accurate calculation */}
                <div className="text-xs text-center text-gray-500 pt-2 italic border-t mt-2">
                  {periodText}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
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
    <>
      {/* Navbar placeholder that doesn't block clicks */}
      <div 
        className={`fixed top-0 left-0 right-0 h-16 z-10 shadow-md ${currentTheme.secondary}`} 
        style={{ pointerEvents: 'none' }}
      ></div>
      
      <div className={`flex flex-col h-screen ${currentTheme.main} ${currentTheme.text} pattern-bg`}>
        {/* Rate limit popup alert */}
        {rateLimited && (
          <div className="fixed top-16 right-4 left-4 z-40 bg-red-600 text-white p-4 rounded-lg shadow-lg flex justify-between items-center">
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
        
        {/* Watch Live Warning Popup - improved design */}
        {showWatchPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`${currentTheme.secondary} rounded-lg p-6 max-w-md shadow-xl border-2 ${currentTheme.border}`}
            >
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-xl font-bold">Entertainment Content Warning</h3>
              </div>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                By proceeding you agree that you are either in lunch, out of school, or have teacher permission to view the March Madness live game. ScheduleSPX has no responsibility if you get in trouble for viewing entertainment instead of doing schoolwork.
              </p>
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={closePopup}
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors"
                >
                  Nevermind
                </button>
                <button 
                  onClick={proceedToNCAA}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  I understand, Proceed
                </button>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Content area with enhanced styling */}
        <div className="flex-grow overflow-y-auto fixed-content scroll-smooth">
          <div className="container mx-auto px-4 pt-20 pb-12">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row justify-between items-center mb-6"
            >
              <h1 className="text-4xl font-bold text-center md:text-left bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                March Madness 2025
              </h1>
              
              {/* Enhanced Watch Live Now button */}
              <button
                onClick={handleWatchLive}
                className="mt-3 md:mt-0 px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-md font-semibold hover:from-red-700 hover:to-orange-600 transition-all flex items-center shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Watch Live Now
              </button>
            </motion.div>

            {/* Enhanced day selector */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`${currentTheme.secondary} border-2 ${currentTheme.border} rounded-lg p-4 mb-6 shadow-md`}
            >
              <h3 className="text-lg font-bold mb-3 text-center">Select Day</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {daysOfWeek.map((day, index) => (
                  <motion.button
                    key={day}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => fetchDaySchedule(day)}
                    className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      selectedDay === day 
                        ? `${currentTheme.accent} font-bold shadow-md` 
                        : `hover:bg-opacity-90 hover:shadow`
                    }`}
                  >
                    {day}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Games section with improved styling */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`md:col-span-2 ${currentTheme.secondary} border-2 ${currentTheme.border} rounded-lg shadow-xl overflow-hidden`}
              >
                <div className={`p-3 ${currentTheme.accent} border-b-2 ${currentTheme.border}`}>
                  <h2 className="text-lg font-bold text-center">Games for {selectedDay}</h2>
                </div>
                <div className="p-5">
                  {renderGames()}
                </div>
              </motion.div>

              {/* Schedule section with improved styling */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`${currentTheme.secondary} border-2 ${currentTheme.border} rounded-lg shadow-xl overflow-hidden`}
              >
                <div className={`p-3 ${currentTheme.accent} border-b-2 ${currentTheme.border}`}>
                  <h2 className="text-lg font-bold text-center">Today's Schedule</h2>
                </div>
                <div className="p-4">
                  {isLoading ? (
                    <div className="space-y-3 animate-pulse">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-6 bg-gray-300 rounded w-full"></div>
                      ))}
                    </div>
                  ) : weekSchedule ? (
                    <Schedule 
                      weekSchedule={weekSchedule} 
                      compact={true}
                    />
                  ) : (
                    <div className="text-center p-4">No schedule data available</div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced styles with better fixed content styling and subtle patterns */}
      <style jsx>{`
        .fixed-content {
          height: 100vh;
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
        
        .pattern-bg {
          background-color: ${currentTheme.main};
          background-image: ${currentTheme.main.includes('dark') ? 
            'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)' : 
            'radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px)'};
          background-size: 20px 20px;
        }
      `}</style>
    </>
  );
};export default MarchMadness;
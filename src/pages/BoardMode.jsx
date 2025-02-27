import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import PeriodProgress from '../components/PeriodProgress';
import { useWeekSchedule } from '../context/WeekScheduleContext';

const BoardMode = () => {
  const { currentTheme } = useTheme();
  const { weekSchedule } = useWeekSchedule();
  const [customEndTime, setCustomEndTime] = useState('');
  const [useCustomEndTime, setUseCustomEndTime] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleSetCustomEndTime = (e) => {
    e.preventDefault();
    setUseCustomEndTime(true);
    setShowSettings(false);
  };

  const handleClearCustomEndTime = () => {
    setUseCustomEndTime(false);
    setCustomEndTime('');
  };

  return (
    <div className={`h-screen ${currentTheme.main} flex items-center justify-center`}>
      <div className="w-full max-w-5xl px-4 relative">
        <div className={`${currentTheme.secondary} border-4 ${currentTheme.border} rounded-xl shadow-2xl p-12`}>
          <PeriodProgress 
            weekSchedule={weekSchedule} 
            customEndTime={useCustomEndTime ? customEndTime : null}
            largeSizing={true}
          />
          
          {/* Discreet controls at bottom */}
          <div className="mt-8 flex justify-center">
            {showSettings ? (
              <div className={`${currentTheme.secondary} border-2 ${currentTheme.border} p-4 rounded-lg shadow-md`}>
                <form onSubmit={handleSetCustomEndTime} className="flex items-end space-x-4">
                  <div>
                    <label className={`block ${currentTheme.text} text-sm mb-1`}>Custom End Time:</label>
                    <input 
                      type="time" 
                      value={customEndTime} 
                      onChange={(e) => setCustomEndTime(e.target.value)}
                      required
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      type="submit" 
                      className={`${currentTheme.accent} text-white px-3 py-2 rounded hover:opacity-90 text-sm`}
                    >
                      Set
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowSettings(false)} 
                      className={`bg-gray-500 text-white px-3 py-2 rounded hover:opacity-90 text-sm`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <button 
                onClick={useCustomEndTime ? handleClearCustomEndTime : () => setShowSettings(true)} 
                className={`${currentTheme.accent} bg-opacity-75 text-white px-4 py-2 rounded-full hover:bg-opacity-100 transition-all text-sm`}
              >
                {useCustomEndTime ? "Clear Custom Timer" : "Set Custom End Time"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardMode;

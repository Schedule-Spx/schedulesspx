/**
 * Format a Date object to hours and minutes (HH:MM AM/PM)
 * @param {Date} dateObj - Date object to format
 * @returns {string} Formatted time string
 */
export const formatTimeToHM = (dateObj) => {
  if (!dateObj || !(dateObj instanceof Date)) return 'Invalid time';
  
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
  return `${hours}:${minutesStr} ${ampm}`;
};

/**
 * Parse a time string into milliseconds
 * @param {string} timeStr - Time string in format "HH:MM AM/PM"
 * @returns {number} Milliseconds
 */
export const parseTimeToMs = (timeStr) => {
  try {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
  } catch (error) {
    console.error('Error parsing time:', error);
    return 0;
  }
};

/**
 * Format milliseconds to time remaining string
 * @param {number} ms - Milliseconds
 * @returns {string} Formatted time string
 */
export const formatMsToTimeRemaining = (ms) => {
  if (ms <= 0) return 'Time up!';
  
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

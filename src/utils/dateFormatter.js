import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Format timestamp to readable date
 * @param {number} timestamp - Unix timestamp
 * @param {string} format - Date format string (default: 'MMM DD, YYYY')
 * @returns {string} Formatted date string
 */
export const formatDate = (timestamp, format = 'MMM DD, YYYY') => {
  return dayjs.unix(timestamp).format(format);
};

/**
 * Format timestamp to readable time
 * @param {number} timestamp - Unix timestamp
 * @param {string} format - Time format string (default: 'h:mm A')
 * @returns {string} Formatted time string
 */
export const formatTime = (timestamp, format = 'h:mm A') => {
  return dayjs.unix(timestamp).format(format);
};

/**
 * Format timestamp to date and time
 * @param {number} timestamp - Unix timestamp
 * @param {string} format - DateTime format string (default: 'MMM DD, h:mm A')
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (timestamp, format = 'MMM DD, h:mm A') => {
  return dayjs.unix(timestamp).format(format);
};

/**
 * Get day name from timestamp
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Day name (e.g., 'Monday')
 */
export const getDayName = (timestamp) => {
  return dayjs.unix(timestamp).format('dddd');
};

/**
 * Get short day name from timestamp
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Short day name (e.g., 'Mon')
 */
export const getShortDayName = (timestamp) => {
  return dayjs.unix(timestamp).format('ddd');
};

/**
 * Check if timestamp is today
 * @param {number} timestamp - Unix timestamp
 * @returns {boolean} True if timestamp is today
 */
export const isToday = (timestamp) => {
  return dayjs.unix(timestamp).isSame(dayjs(), 'day');
};

/**
 * Group forecast data by day
 * @param {Array} forecastList - Array of forecast items from API
 * @returns {Object} Grouped forecast by date
 */
export const groupForecastByDay = (forecastList) => {
  const grouped = {};

  forecastList.forEach(item => {
    const date = formatDate(item.dt, 'YYYY-MM-DD');
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return grouped;
};

/**
 * Get daily summary from hourly forecast data
 * @param {Array} dayData - Array of hourly forecasts for a day
 * @returns {Object} Summary with min/max temps, most common condition
 */
export const getDailySummary = (dayData) => {
  const temps = dayData.map(item => item.main.temp);
  const conditions = dayData.map(item => item.weather[0].main);

  // Find most common condition
  const conditionCount = {};
  conditions.forEach(condition => {
    conditionCount[condition] = (conditionCount[condition] || 0) + 1;
  });
  const mostCommonCondition = Object.keys(conditionCount).reduce((a, b) =>
    conditionCount[a] > conditionCount[b] ? a : b
  );

  // Get the weather object for the most common condition
  const weatherObj = dayData.find(item => item.weather[0].main === mostCommonCondition).weather[0];

  return {
    minTemp: Math.round(Math.min(...temps)),
    maxTemp: Math.round(Math.max(...temps)),
    condition: mostCommonCondition,
    weather: weatherObj,
    timestamp: dayData[Math.floor(dayData.length / 2)].dt // Use middle timestamp
  };
};

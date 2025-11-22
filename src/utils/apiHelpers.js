import axios from 'axios';

// OpenWeatherMap API configuration
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Create axios instance with base configuration
 */
const weatherAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
});

/**
 * Handle API errors and return user-friendly messages
 * @param {Error} error - Axios error object
 * @returns {string} User-friendly error message
 */
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    switch (error.response.status) {
      case 404:
        return 'City not found. Please check the spelling and try again.';
      case 401:
        return 'Invalid API key. Please check your configuration.';
      case 429:
        return 'API rate limit exceeded. Please try again later.';
      case 500:
      case 502:
      case 503:
        return 'Weather service is temporarily unavailable. Please try again later.';
      default:
        return `Error: ${error.response.data.message || 'Unable to fetch weather data'}`;
    }
  } else if (error.request) {
    // Request was made but no response
    return 'Network error. Please check your internet connection and try again.';
  } else {
    // Something else happened
    return 'An unexpected error occurred. Please try again.';
  }
};

/**
 * Fetch current weather by city name
 * @param {string} cityName - Name of the city
 * @param {string} units - 'metric' or 'imperial' (default: 'metric')
 * @returns {Promise<Object>} Current weather data
 */
export const getCurrentWeatherByCity = async (cityName, units = 'metric') => {
  try {
    const response = await weatherAPI.get('/weather', {
      params: {
        q: cityName,
        units,
        appid: API_KEY,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: handleAPIError(error) };
  }
};

/**
 * Fetch current weather by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} units - 'metric' or 'imperial' (default: 'metric')
 * @returns {Promise<Object>} Current weather data
 */
export const getCurrentWeatherByCoords = async (lat, lon, units = 'metric') => {
  try {
    const response = await weatherAPI.get('/weather', {
      params: {
        lat,
        lon,
        units,
        appid: API_KEY,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: handleAPIError(error) };
  }
};

/**
 * Fetch 5-day forecast by city name
 * @param {string} cityName - Name of the city
 * @param {string} units - 'metric' or 'imperial' (default: 'metric')
 * @returns {Promise<Object>} 5-day forecast data (3-hour intervals)
 */
export const getForecastByCity = async (cityName, units = 'metric') => {
  try {
    const response = await weatherAPI.get('/forecast', {
      params: {
        q: cityName,
        units,
        appid: API_KEY,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: handleAPIError(error) };
  }
};

/**
 * Fetch 5-day forecast by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} units - 'metric' or 'imperial' (default: 'metric')
 * @returns {Promise<Object>} 5-day forecast data (3-hour intervals)
 */
export const getForecastByCoords = async (lat, lon, units = 'metric') => {
  try {
    const response = await weatherAPI.get('/forecast', {
      params: {
        lat,
        lon,
        units,
        appid: API_KEY,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: handleAPIError(error) };
  }
};

/**
 * Get weather icon URL from icon code
 * @param {string} iconCode - Weather icon code from API
 * @param {string} size - Icon size ('2x' or '4x', default: '2x')
 * @returns {string} Full URL to weather icon
 */
export const getWeatherIconUrl = (iconCode, size = '2x') => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};

/**
 * Validate API key exists
 * @returns {boolean} True if API key is configured
 */
export const isAPIKeyConfigured = () => {
  return Boolean(API_KEY && API_KEY !== 'your_api_key_here');
};

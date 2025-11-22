import { useState, useEffect, useCallback } from 'react';
import {
  getCurrentWeatherByCity,
  getCurrentWeatherByCoords,
  getForecastByCity,
  getForecastByCoords,
} from '../utils/apiHelpers';

/**
 * Custom hook for fetching and managing weather data
 * @param {string} initialCity - Initial city to fetch weather for
 * @param {string} units - Temperature units ('metric' or 'imperial')
 * @returns {Object} Weather data, loading states, and functions
 */
const useWeather = (initialCity = '', units = 'metric') => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(initialCity);

  /**
   * Fetch weather data by city name
   */
  const fetchWeatherByCity = useCallback(async (cityName) => {
    if (!cityName) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    // Fetch both current weather and forecast
    const [currentResult, forecastResult] = await Promise.all([
      getCurrentWeatherByCity(cityName, units),
      getForecastByCity(cityName, units),
    ]);

    if (currentResult.error) {
      setError(currentResult.error);
      setCurrentWeather(null);
      setForecast(null);
    } else {
      setCurrentWeather(currentResult.data);
      setForecast(forecastResult.data);
      setCity(cityName);
      setError(null);
    }

    setLoading(false);
  }, [units]);

  /**
   * Fetch weather data by coordinates
   */
  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);

    // Fetch both current weather and forecast
    const [currentResult, forecastResult] = await Promise.all([
      getCurrentWeatherByCoords(lat, lon, units),
      getForecastByCoords(lat, lon, units),
    ]);

    if (currentResult.error) {
      setError(currentResult.error);
      setCurrentWeather(null);
      setForecast(null);
    } else {
      setCurrentWeather(currentResult.data);
      setForecast(forecastResult.data);
      setCity(currentResult.data.name);
      setError(null);
    }

    setLoading(false);
  }, [units]);

  /**
   * Refresh current weather data
   */
  const refreshWeather = useCallback(() => {
    if (city) {
      fetchWeatherByCity(city);
    }
  }, [city, fetchWeatherByCity]);

  // Fetch weather for initial city when units change
  useEffect(() => {
    if (city) {
      fetchWeatherByCity(city);
    }
  }, [units]); // Only re-fetch when units change, not when city changes

  return {
    currentWeather,
    forecast,
    loading,
    error,
    city,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    refreshWeather,
    setError,
  };
};

export default useWeather;

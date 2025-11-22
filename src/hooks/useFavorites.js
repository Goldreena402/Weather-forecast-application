import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'weather_favorites';

/**
 * Custom hook for managing favorite cities with LocalStorage
 * @returns {Object} Favorites array and management functions
 */
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from LocalStorage on mount
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setFavorites(parsed);
        }
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
        setFavorites([]);
      }
    };

    loadFavorites();
  }, []);

  // Save favorites to LocalStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  /**
   * Add a city to favorites
   * @param {string} cityName - Name of city to add
   */
  const addFavorite = (cityName) => {
    if (!cityName || cityName.trim() === '') return;

    const trimmedCity = cityName.trim();

    // Check if city already exists (case-insensitive)
    const exists = favorites.some(
      (fav) => fav.toLowerCase() === trimmedCity.toLowerCase()
    );

    if (!exists) {
      setFavorites((prev) => [...prev, trimmedCity]);
    }
  };

  /**
   * Remove a city from favorites
   * @param {string} cityName - Name of city to remove
   */
  const removeFavorite = (cityName) => {
    setFavorites((prev) =>
      prev.filter((fav) => fav.toLowerCase() !== cityName.toLowerCase())
    );
  };

  /**
   * Check if a city is in favorites
   * @param {string} cityName - Name of city to check
   * @returns {boolean} True if city is in favorites
   */
  const isFavorite = (cityName) => {
    if (!cityName) return false;
    return favorites.some(
      (fav) => fav.toLowerCase() === cityName.toLowerCase()
    );
  };

  /**
   * Toggle favorite status of a city
   * @param {string} cityName - Name of city to toggle
   */
  const toggleFavorite = (cityName) => {
    if (isFavorite(cityName)) {
      removeFavorite(cityName);
    } else {
      addFavorite(cityName);
    }
  };

  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
};

export default useFavorites;

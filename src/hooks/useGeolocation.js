import { useState } from 'react';

/**
 * Custom hook for handling browser geolocation
 * @returns {Object} Geolocation state and function to get location
 */
const useGeolocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);

  /**
   * Get user's current position using browser geolocation API
   * @param {Function} onSuccess - Callback function when location is successfully retrieved
   * @returns {Promise<Object>} Coordinates object with lat and lon
   */
  const getCurrentPosition = (onSuccess) => {
    return new Promise((resolve, reject) => {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        const errorMsg = 'Geolocation is not supported by your browser';
        setError(errorMsg);
        reject(new Error(errorMsg));
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

          setCoords(coordinates);
          setLoading(false);
          setError(null);

          // Call success callback if provided
          if (onSuccess) {
            onSuccess(coordinates.lat, coordinates.lon);
          }

          resolve(coordinates);
        },
        (err) => {
          let errorMsg = 'Unable to retrieve your location';

          // Handle different geolocation error codes
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMsg = 'Location permission denied. Please enable location access in your browser settings.';
              break;
            case err.POSITION_UNAVAILABLE:
              errorMsg = 'Location information is unavailable. Please try again.';
              break;
            case err.TIMEOUT:
              errorMsg = 'Location request timed out. Please try again.';
              break;
            default:
              errorMsg = 'An unknown error occurred while getting your location.';
          }

          setError(errorMsg);
          setLoading(false);
          setCoords(null);
          reject(new Error(errorMsg));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000, // 10 seconds
          maximumAge: 0, // Don't use cached position
        }
      );
    });
  };

  /**
   * Clear error state
   */
  const clearError = () => {
    setError(null);
  };

  return {
    loading,
    error,
    coords,
    getCurrentPosition,
    clearError,
  };
};

export default useGeolocation;

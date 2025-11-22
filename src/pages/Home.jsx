import { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import UnitToggle from '../components/UnitToggle';
import FavoriteButton from '../components/FavoriteButton';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import useGeolocation from '../hooks/useGeolocation';

/**
 * Home page component - displays current weather and search functionality
 */
const Home = ({
  currentWeather,
  loading,
  error,
  units,
  onUnitChange,
  onSearch,
  onSearchByCoords,
  isFavorite,
  onToggleFavorite,
  city
}) => {
  const { loading: locationLoading, getCurrentPosition } = useGeolocation();

  const handleUseLocation = () => {
    getCurrentPosition((lat, lon) => {
      onSearchByCoords(lat, lon);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header with unit toggle */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Weather Now</h1>
        <UnitToggle units={units} onToggle={onUnitChange} />
      </div>

      {/* Search bar */}
      <div className="mb-8">
        <SearchBar
          onSearch={onSearch}
          onUseLocation={handleUseLocation}
          loading={loading}
          locationLoading={locationLoading}
        />
      </div>

      {/* Error message */}
      {error && !loading && (
        <div className="mb-8">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Loading skeleton */}
      {loading && <LoadingSkeleton type="weather" />}

      {/* Current weather display */}
      {!loading && !error && currentWeather && (
        <div className="space-y-6">
          {/* Favorite button */}
          <div className="flex justify-end">
            <FavoriteButton
              city={city}
              isFavorite={isFavorite}
              onToggle={onToggleFavorite}
            />
          </div>

          <CurrentWeather data={currentWeather} units={units} />
        </div>
      )}

      {/* Initial state message */}
      {!loading && !error && !currentWeather && (
        <div className="text-center py-16">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Welcome to Weather Forecast
          </h2>
          <p className="text-white/70 text-lg">
            Search for a city or use your location to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;

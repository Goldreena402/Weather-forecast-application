import { useNavigate } from 'react-router-dom';
import FavoritesList from '../components/FavoritesList';

/**
 * Favorites page component - displays and manages favorite cities
 */
const Favorites = ({
  favorites,
  onCityClick,
  onRemoveFavorite,
  currentCity,
}) => {
  const navigate = useNavigate();

  const handleCityClick = (city) => {
    onCityClick(city);
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Favorite Cities</h1>
        <p className="text-white/70">
          Click on any city to view its weather
        </p>
      </div>

      {/* Favorites list */}
      <FavoritesList
        favorites={favorites}
        onCityClick={handleCityClick}
        onRemove={onRemoveFavorite}
        currentCity={currentCity}
      />

      {/* Back to home button */}
      {favorites.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white font-semibold rounded-lg hover:bg-white/30 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;

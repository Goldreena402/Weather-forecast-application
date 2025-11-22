import { FaTrash, FaMapMarkerAlt } from 'react-icons/fa';

/**
 * FavoritesList component for displaying and managing favorite cities
 * @param {Object} props
 * @param {Array} props.favorites - Array of favorite city names
 * @param {Function} props.onCityClick - Callback when city is clicked
 * @param {Function} props.onRemove - Callback when remove button is clicked
 * @param {string} props.currentCity - Currently selected city
 */
const FavoritesList = ({ favorites, onCityClick, onRemove, currentCity }) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <FaMapMarkerAlt className="text-6xl text-white/30 mx-auto mb-4" />
        <p className="text-white/70 text-lg">No favorite cities yet</p>
        <p className="text-white/50 text-sm mt-2">
          Search for a city and add it to favorites!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((city) => (
        <div
          key={city}
          className={`bg-white/20 backdrop-blur-md rounded-lg p-4 transition-all duration-200 hover:bg-white/30 border-2 ${
            currentCity?.toLowerCase() === city.toLowerCase()
              ? 'border-white'
              : 'border-transparent'
          }`}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => onCityClick(city)}
              className="flex-1 text-left"
            >
              <h3 className="text-xl font-semibold text-white hover:text-blue-100 transition-colors">
                {city}
              </h3>
              {currentCity?.toLowerCase() === city.toLowerCase() && (
                <span className="text-xs text-white/70 mt-1 inline-block">
                  Currently viewing
                </span>
              )}
            </button>
            <button
              onClick={() => onRemove(city)}
              className="p-2 text-red-300 hover:text-red-500 hover:bg-red-100/20 rounded-lg transition-all duration-200"
              title={`Remove ${city} from favorites`}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;

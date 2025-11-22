import { FaHeart, FaRegHeart } from 'react-icons/fa';

/**
 * FavoriteButton component for adding/removing cities from favorites
 * @param {Object} props
 * @param {string} props.city - City name
 * @param {boolean} props.isFavorite - Whether city is in favorites
 * @param {Function} props.onToggle - Callback function when favorite is toggled
 */
const FavoriteButton = ({ city, isFavorite, onToggle }) => {
  const handleClick = () => {
    if (city) {
      onToggle(city);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!city}
      className={`p-3 rounded-full transition-all duration-200 ${
        isFavorite
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-white/20 text-white hover:bg-white/30'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <FaHeart className="text-xl" />
      ) : (
        <FaRegHeart className="text-xl" />
      )}
    </button>
  );
};

export default FavoriteButton;

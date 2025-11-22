import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

/**
 * SearchBar component for city search and geolocation
 * @param {Object} props
 * @param {Function} props.onSearch - Callback function when search is submitted
 * @param {Function} props.onUseLocation - Callback function for geolocation button
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.locationLoading - Geolocation loading state
 */
const SearchBar = ({ onSearch, onUseLocation, loading, locationLoading }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        {/* Search input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a city..."
            className="w-full px-4 py-3 pl-12 rounded-lg bg-white/90 backdrop-blur-sm border-2 border-transparent focus:border-white focus:outline-none text-gray-800 placeholder-gray-500"
            disabled={loading}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Search button */}
        <button
          type="submit"
          disabled={loading || !searchInput.trim()}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>

        {/* Geolocation button */}
        <button
          type="button"
          onClick={onUseLocation}
          disabled={locationLoading || loading}
          className="px-4 py-3 bg-white/90 backdrop-blur-sm text-blue-600 rounded-lg hover:bg-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          title="Use my location"
        >
          <FaMapMarkerAlt className={locationLoading ? 'animate-pulse' : ''} />
          {locationLoading ? 'Locating...' : ''}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

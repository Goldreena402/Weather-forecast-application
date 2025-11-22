import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaHeart } from 'react-icons/fa';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import Favorites from './pages/Favorites';
import useWeather from './hooks/useWeather';
import useFavorites from './hooks/useFavorites';
import { getWeatherTheme } from './utils/weatherThemes';
import { isAPIKeyConfigured } from './utils/apiHelpers';

/**
 * Navigation component
 */
const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/forecast', icon: FaCalendarAlt, label: 'Forecast' },
    { path: '/favorites', icon: FaHeart, label: 'Favorites' },
  ];

  return (
    <nav className="bg-white/10 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center space-x-8 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-blue-600 font-semibold shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Icon className="text-xl" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

/**
 * Main App component
 */
function App() {
  const [units, setUnits] = useState('metric');
  const [theme, setTheme] = useState(getWeatherTheme('Clear'));

  const {
    currentWeather,
    forecast,
    loading,
    error,
    city,
    fetchWeatherByCity,
    fetchWeatherByCoords,
  } = useWeather('', units);

  const {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
  } = useFavorites();

  // Update theme based on current weather
  useEffect(() => {
    if (currentWeather && currentWeather.weather && currentWeather.weather[0]) {
      const weatherCondition = currentWeather.weather[0].main;
      setTheme(getWeatherTheme(weatherCondition));
    }
  }, [currentWeather]);

  // Check if API key is configured
  useEffect(() => {
    if (!isAPIKeyConfigured()) {
      console.warn('⚠️ OpenWeatherMap API key is not configured. Please add your API key to the .env file.');
    }
  }, []);

  const handleUnitChange = (newUnits) => {
    setUnits(newUnits);
  };

  const handleSearch = (cityName) => {
    fetchWeatherByCity(cityName);
  };

  const handleSearchByCoords = (lat, lon) => {
    fetchWeatherByCoords(lat, lon);
  };

  const handleFavoriteClick = (cityName) => {
    fetchWeatherByCity(cityName);
  };

  return (
    <Router>
      <div className={`min-h-screen ${theme.bgClass} transition-all duration-700`}>
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-white text-center">
              ⛅ Weather Forecast App
            </h1>
          </div>
        </header>

        {/* Navigation */}
        <Navigation />

        {/* Main content */}
        <main className="min-h-[calc(100vh-180px)] py-8">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  currentWeather={currentWeather}
                  loading={loading}
                  error={error}
                  units={units}
                  onUnitChange={handleUnitChange}
                  onSearch={handleSearch}
                  onSearchByCoords={handleSearchByCoords}
                  isFavorite={isFavorite(city)}
                  onToggleFavorite={toggleFavorite}
                  city={city}
                />
              }
            />
            <Route
              path="/forecast"
              element={
                <Forecast
                  forecast={forecast}
                  loading={loading}
                  error={error}
                  units={units}
                  city={city}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  onCityClick={handleFavoriteClick}
                  onRemoveFavorite={removeFavorite}
                  currentCity={city}
                />
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white/10 backdrop-blur-md py-4 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-white/70">
            <p>Weather data provided by OpenWeatherMap</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

// Weather condition to theme mapping
export const weatherThemes = {
  Clear: {
    gradient: 'from-blue-400 to-blue-600',
    bgClass: 'bg-gradient-to-br from-blue-400 to-blue-600',
    textColor: 'text-white',
    cardBg: 'bg-white/20',
    name: 'clear'
  },
  Clouds: {
    gradient: 'from-gray-400 to-gray-600',
    bgClass: 'bg-gradient-to-br from-gray-400 to-gray-600',
    textColor: 'text-white',
    cardBg: 'bg-white/20',
    name: 'clouds'
  },
  Rain: {
    gradient: 'from-blue-700 to-gray-800',
    bgClass: 'bg-gradient-to-br from-blue-700 to-gray-800',
    textColor: 'text-white',
    cardBg: 'bg-white/20',
    name: 'rain'
  },
  Drizzle: {
    gradient: 'from-blue-500 to-gray-700',
    bgClass: 'bg-gradient-to-br from-blue-500 to-gray-700',
    textColor: 'text-white',
    cardBg: 'bg-white/20',
    name: 'drizzle'
  },
  Thunderstorm: {
    gradient: 'from-gray-800 to-purple-900',
    bgClass: 'bg-gradient-to-br from-gray-800 to-purple-900',
    textColor: 'text-white',
    cardBg: 'bg-white/20',
    name: 'thunderstorm'
  },
  Snow: {
    gradient: 'from-blue-100 to-blue-300',
    bgClass: 'bg-gradient-to-br from-blue-100 to-blue-300',
    textColor: 'text-gray-800',
    cardBg: 'bg-white/30',
    name: 'snow'
  },
  Mist: {
    gradient: 'from-gray-300 to-gray-500',
    bgClass: 'bg-gradient-to-br from-gray-300 to-gray-500',
    textColor: 'text-gray-800',
    cardBg: 'bg-white/30',
    name: 'mist'
  },
  Smoke: {
    gradient: 'from-gray-400 to-gray-600',
    bgClass: 'bg-gradient-to-br from-gray-400 to-gray-600',
    textColor: 'text-white',
    cardBg: 'bg-white/20',
    name: 'smoke'
  },
  Haze: {
    gradient: 'from-yellow-200 to-orange-300',
    bgClass: 'bg-gradient-to-br from-yellow-200 to-orange-300',
    textColor: 'text-gray-800',
    cardBg: 'bg-white/30',
    name: 'haze'
  },
  Dust: {
    gradient: 'from-yellow-300 to-orange-400',
    bgClass: 'bg-gradient-to-br from-yellow-300 to-orange-400',
    textColor: 'text-gray-800',
    cardBg: 'bg-white/30',
    name: 'dust'
  },
  Fog: {
    gradient: 'from-gray-300 to-gray-400',
    bgClass: 'bg-gradient-to-br from-gray-300 to-gray-400',
    textColor: 'text-gray-800',
    cardBg: 'bg-white/30',
    name: 'fog'
  },
  Sand: {
    gradient: 'from-yellow-400 to-orange-500',
    bgClass: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    textColor: 'text-gray-800',
    cardBg: 'bg-white/30',
    name: 'sand'
  },
  Ash: {
    gradient: 'from-gray-500 to-gray-700',
    bgClass: 'bg-gradient-to-br from-gray-500 to-gray-700',
    textColor: 'text-white',
    cardBg: 'bg-white/20',
    name: 'ash'
  },
  Squall: {
    gradient: 'from-gray-600 to-blue-800',
    bgClass: 'bg-gradient-to-br from-gray-600 to-blue-800',
    textColor: 'text-white',
    cardBg: 'bg-white/20',
    name: 'squall'
  },
  Tornado: {
    gradient: 'from-gray-700 to-gray-900',
    bgClass: 'bg-gradient-to-br from-gray-700 to-gray-900',
    textColor: 'text-white',
    cardBg: 'bg-white/20',
    name: 'tornado'
  }
};

// Default theme for unknown weather conditions
export const defaultTheme = {
  gradient: 'from-blue-500 to-purple-600',
  bgClass: 'bg-gradient-to-br from-blue-500 to-purple-600',
  textColor: 'text-white',
  cardBg: 'bg-white/20',
  name: 'default'
};

/**
 * Get theme based on weather condition
 * @param {string} condition - Weather condition from API (e.g., 'Clear', 'Rain')
 * @returns {object} Theme object with gradient, colors, etc.
 */
export const getWeatherTheme = (condition) => {
  return weatherThemes[condition] || defaultTheme;
};

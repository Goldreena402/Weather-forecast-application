/**
 * UnitToggle component for switching between Celsius and Fahrenheit
 * @param {Object} props
 * @param {string} props.units - Current units ('metric' or 'imperial')
 * @param {Function} props.onToggle - Callback function when units are toggled
 */
const UnitToggle = ({ units, onToggle }) => {
  const isMetric = units === 'metric';

  return (
    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full p-1">
      <button
        onClick={() => onToggle('metric')}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
          isMetric
            ? 'bg-white text-blue-600 shadow-md'
            : 'text-white hover:bg-white/10'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => onToggle('imperial')}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
          !isMetric
            ? 'bg-white text-blue-600 shadow-md'
            : 'text-white hover:bg-white/10'
        }`}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;

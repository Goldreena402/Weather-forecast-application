import { getWeatherIconUrl } from '../utils/apiHelpers';
import { getShortDayName, formatDate, isToday } from '../utils/dateFormatter';

/**
 * ForecastCard component for displaying a single day's forecast
 * @param {Object} props
 * @param {Object} props.data - Daily forecast summary data
 * @param {string} props.units - Temperature units ('metric' or 'imperial')
 * @param {Function} props.onClick - Callback when card is clicked
 * @param {boolean} props.isSelected - Whether this card is currently selected
 */
const ForecastCard = ({ data, units, onClick, isSelected }) => {
  if (!data) return null;

  const tempUnit = units === 'metric' ? '°C' : '°F';
  const dayLabel = isToday(data.timestamp) ? 'Today' : getShortDayName(data.timestamp);
  const dateLabel = formatDate(data.timestamp, 'MMM DD');

  return (
    <div
      onClick={onClick}
      className={`bg-white/20 backdrop-blur-md rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-white/30 hover:scale-105 ${
        isSelected ? 'ring-2 ring-white shadow-lg' : ''
      }`}
    >
      {/* Day name */}
      <div className="text-center mb-3">
        <p className="text-lg font-semibold text-white">{dayLabel}</p>
        <p className="text-sm text-white/70">{dateLabel}</p>
      </div>

      {/* Weather icon */}
      <div className="flex justify-center mb-3">
        <img
          src={getWeatherIconUrl(data.weather.icon, '2x')}
          alt={data.weather.description}
          className="w-20 h-20"
        />
      </div>

      {/* Temperature range */}
      <div className="text-center mb-2">
        <div className="text-2xl font-bold text-white">
          {data.maxTemp}{tempUnit}
        </div>
        <div className="text-sm text-white/70">
          {data.minTemp}{tempUnit}
        </div>
      </div>

      {/* Weather condition */}
      <p className="text-center text-sm text-white/80 capitalize">
        {data.weather.description}
      </p>
    </div>
  );
};

export default ForecastCard;

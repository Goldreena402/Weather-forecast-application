import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { formatTime } from '../utils/dateFormatter';
import { getWeatherIconUrl } from '../utils/apiHelpers';

/**
 * HourlyForecast component for displaying hourly forecast with temperature chart
 * @param {Object} props
 * @param {Array} props.hourlyData - Array of hourly forecast items
 * @param {string} props.units - Temperature units ('metric' or 'imperial')
 */
const HourlyForecast = ({ hourlyData, units }) => {
  if (!hourlyData || hourlyData.length === 0) return null;

  const tempUnit = units === 'metric' ? '°C' : '°F';

  // Prepare data for the chart
  const chartData = hourlyData.map((item) => ({
    time: formatTime(item.dt, 'h A'),
    temp: Math.round(item.main.temp),
    fullTime: formatTime(item.dt, 'h:mm A'),
  }));

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/20">
          <p className="font-semibold text-gray-800">{payload[0].payload.fullTime}</p>
          <p className="text-blue-600 font-bold">
            {payload[0].value}{tempUnit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 mt-6">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Hourly Forecast
      </h3>

      {/* Temperature trend chart */}
      <div className="mb-8 bg-white/10 rounded-lg p-4">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.7)"
              tick={{ fill: 'rgba(255,255,255,0.7)' }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.7)"
              tick={{ fill: 'rgba(255,255,255,0.7)' }}
              label={{
                value: tempUnit,
                angle: -90,
                position: 'insideLeft',
                fill: 'rgba(255,255,255,0.7)',
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#fff"
              strokeWidth={3}
              dot={{ fill: '#fff', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Hourly cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {hourlyData.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 rounded-lg p-3 text-center hover:bg-white/20 transition-colors duration-200"
          >
            <p className="text-white/80 text-sm mb-2">
              {formatTime(item.dt, 'h A')}
            </p>
            <img
              src={getWeatherIconUrl(item.weather[0].icon)}
              alt={item.weather[0].description}
              className="w-12 h-12 mx-auto"
            />
            <p className="text-xl font-bold text-white mt-2">
              {Math.round(item.main.temp)}°
            </p>
            <p className="text-xs text-white/70 mt-1 capitalize truncate">
              {item.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;

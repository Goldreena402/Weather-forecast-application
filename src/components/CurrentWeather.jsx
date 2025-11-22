import { WiHumidity, WiStrongWind, WiBarometer, WiThermometer } from 'react-icons/wi';
import { getWeatherIconUrl } from '../utils/apiHelpers';
import { formatDateTime } from '../utils/dateFormatter';

/**
 * CurrentWeather component for displaying current weather information
 * @param {Object} props
 * @param {Object} props.data - Current weather data from API
 * @param {string} props.units - Temperature units ('metric' or 'imperial')
 */
const CurrentWeather = ({ data, units }) => {
  if (!data) return null;

  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl">
      {/* City name and date */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-white mb-2">
          {data.name}, {data.sys.country}
        </h2>
        <p className="text-white/80">
          {formatDateTime(data.dt, 'dddd, MMMM DD, YYYY - h:mm A')}
        </p>
      </div>

      {/* Weather icon and main info */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={getWeatherIconUrl(data.weather[0].icon, '4x')}
          alt={data.weather[0].description}
          className="w-40 h-40"
        />
        <div className="text-center">
          <div className="text-6xl font-bold text-white mb-2">
            {Math.round(data.main.temp)}{tempUnit}
          </div>
          <p className="text-2xl text-white/90 capitalize">
            {data.weather[0].description}
          </p>
          <p className="text-lg text-white/70 mt-2">
            Feels like {Math.round(data.main.feels_like)}{tempUnit}
          </p>
        </div>
      </div>

      {/* Weather details grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Humidity */}
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <WiHumidity className="text-4xl text-white mx-auto mb-2" />
          <p className="text-white/70 text-sm mb-1">Humidity</p>
          <p className="text-2xl font-semibold text-white">
            {data.main.humidity}%
          </p>
        </div>

        {/* Wind Speed */}
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <WiStrongWind className="text-4xl text-white mx-auto mb-2" />
          <p className="text-white/70 text-sm mb-1">Wind Speed</p>
          <p className="text-2xl font-semibold text-white">
            {Math.round(data.wind.speed)} {windUnit}
          </p>
        </div>

        {/* Pressure */}
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <WiBarometer className="text-4xl text-white mx-auto mb-2" />
          <p className="text-white/70 text-sm mb-1">Pressure</p>
          <p className="text-2xl font-semibold text-white">
            {data.main.pressure} hPa
          </p>
        </div>

        {/* Min/Max Temperature */}
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <WiThermometer className="text-4xl text-white mx-auto mb-2" />
          <p className="text-white/70 text-sm mb-1">Min / Max</p>
          <p className="text-2xl font-semibold text-white">
            {Math.round(data.main.temp_min)}° / {Math.round(data.main.temp_max)}°
          </p>
        </div>
      </div>

      {/* Additional info */}
      {data.clouds && (
        <div className="mt-6 text-center">
          <p className="text-white/70">
            Cloudiness: <span className="text-white font-semibold">{data.clouds.all}%</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;

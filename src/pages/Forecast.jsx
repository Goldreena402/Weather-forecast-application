import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ForecastCard from '../components/ForecastCard';
import HourlyForecast from '../components/HourlyForecast';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import { groupForecastByDay, getDailySummary } from '../utils/dateFormatter';

/**
 * Forecast page component - displays 5-day forecast and hourly details
 */
const Forecast = ({ forecast, loading, error, units, city }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [dailyForecasts, setDailyForecasts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (forecast && forecast.list) {
      // Group forecast by day
      const grouped = groupForecastByDay(forecast.list);
      const daily = Object.entries(grouped).map(([date, dayData]) => ({
        date,
        ...getDailySummary(dayData),
        hourlyData: dayData,
      }));

      setDailyForecasts(daily);

      // Auto-select first day
      if (daily.length > 0 && !selectedDay) {
        setSelectedDay(daily[0].date);
      }
    }
  }, [forecast]);

  // Redirect to home if no forecast data
  if (!loading && !error && !forecast) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h2 className="text-3xl font-semibold text-white mb-4">
            No Forecast Data Available
          </h2>
          <p className="text-white/70 text-lg mb-6">
            Please search for a city first
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const selectedDayData = dailyForecasts.find((day) => day.date === selectedDay);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">5-Day Forecast</h1>
        {city && <p className="text-white/70 text-lg">{city}</p>}
      </div>

      {/* Error message */}
      {error && !loading && (
        <ErrorMessage message={error} onRetry={() => navigate('/')} />
      )}

      {/* Loading skeleton */}
      {loading && <LoadingSkeleton type="forecast" />}

      {/* Forecast content */}
      {!loading && !error && dailyForecasts.length > 0 && (
        <div className="space-y-8">
          {/* Daily forecast cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {dailyForecasts.map((day) => (
              <ForecastCard
                key={day.date}
                data={day}
                units={units}
                onClick={() => setSelectedDay(day.date)}
                isSelected={selectedDay === day.date}
              />
            ))}
          </div>

          {/* Hourly forecast for selected day */}
          {selectedDayData && (
            <HourlyForecast
              hourlyData={selectedDayData.hourlyData}
              units={units}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Forecast;

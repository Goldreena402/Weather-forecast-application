/**
 * LoadingSkeleton component for displaying animated loading placeholders
 * @param {Object} props
 * @param {string} props.type - Type of skeleton ('weather', 'forecast', 'card')
 */
const LoadingSkeleton = ({ type = 'weather' }) => {
  if (type === 'weather') {
    return (
      <div className="animate-pulse space-y-4 p-6 bg-white/20 backdrop-blur-md rounded-xl">
        {/* City name skeleton */}
        <div className="h-8 bg-white/30 rounded w-2/3 mx-auto"></div>

        {/* Weather icon skeleton */}
        <div className="h-32 w-32 bg-white/30 rounded-full mx-auto"></div>

        {/* Temperature skeleton */}
        <div className="h-12 bg-white/30 rounded w-1/2 mx-auto"></div>

        {/* Description skeleton */}
        <div className="h-6 bg-white/30 rounded w-1/3 mx-auto"></div>

        {/* Weather details grid skeleton */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="h-20 bg-white/30 rounded"></div>
          <div className="h-20 bg-white/30 rounded"></div>
          <div className="h-20 bg-white/30 rounded"></div>
          <div className="h-20 bg-white/30 rounded"></div>
        </div>
      </div>
    );
  }

  if (type === 'forecast') {
    return (
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white/20 backdrop-blur-md rounded-lg p-4 space-y-3">
            <div className="h-6 bg-white/30 rounded w-3/4 mx-auto"></div>
            <div className="h-16 w-16 bg-white/30 rounded-full mx-auto"></div>
            <div className="h-8 bg-white/30 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-white/30 rounded w-2/3 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="animate-pulse bg-white/20 backdrop-blur-md rounded-lg p-4 space-y-3">
        <div className="h-6 bg-white/30 rounded w-3/4"></div>
        <div className="h-4 bg-white/30 rounded w-1/2"></div>
        <div className="h-4 bg-white/30 rounded w-2/3"></div>
      </div>
    );
  }

  // Default simple skeleton
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
    </div>
  );
};

export default LoadingSkeleton;

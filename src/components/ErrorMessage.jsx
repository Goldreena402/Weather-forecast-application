import { WiDaySunny } from 'react-icons/wi';
import { MdError } from 'react-icons/md';

/**
 * ErrorMessage component for displaying user-friendly error messages
 * @param {Object} props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onRetry - Optional retry callback function
 */
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border-2 border-red-200 max-w-md mx-auto">
      <MdError className="text-6xl text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-red-700 mb-2">Oops!</h3>
      <p className="text-gray-700 text-center mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

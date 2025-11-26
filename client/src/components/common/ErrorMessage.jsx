const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="card p-6 max-w-md mx-auto my-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-400 mb-2">Error</h3>
          <p className="text-gray-300 mb-4">{error}</p>
          {onRetry && (
            <button onClick={onRetry} className="btn-primary">
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;

const ApodSkeleton = () => {
  return (
    <div className="card animate-pulse">
      <div className="aspect-video bg-gray-700"></div>
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-700 rounded w-1/4"></div>
        <div className="h-5 bg-gray-700 rounded w-3/4"></div>
        <div className="h-5 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto animate-pulse">
      <div className="text-center mb-8">
        <div className="h-10 bg-gray-700 rounded w-96 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-48 mx-auto"></div>
      </div>
      <div className="card p-6 mb-8">
        <div className="aspect-video bg-gray-700 rounded-lg mb-6"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApodSkeleton;

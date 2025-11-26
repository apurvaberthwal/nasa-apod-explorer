const Loader = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-space-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-space-400 border-t-transparent rounded-full animate-spin animation-delay-150"></div>
      </div>
    </div>
  );
};

export default Loader;

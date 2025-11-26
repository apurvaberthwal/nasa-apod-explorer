import { formatDateShort } from '../../utils/dateUtils';

const ApodCard = ({ apod, onClick }) => {
  // Helper to get a valid image URL
  const getImageUrl = () => {
    if (apod.media_type === 'image') return apod.url;
    if (apod.thumbnail_url) return apod.thumbnail_url;

    // Fallback for YouTube videos if no thumbnail_url
    if (apod.url && (apod.url.includes('youtube.com') || apod.url.includes('youtu.be'))) {
      const videoId = apod.url.split('/').pop().split('?')[0];
      return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    }

    return null; // Will trigger fallback render
  };

  const imageUrl = getImageUrl();

  return (
    <div
      onClick={onClick}
      className="glass-card rounded-xl overflow-hidden cursor-pointer group h-full flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden bg-space-900">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={apod.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex'; // Show fallback
            }}
          />
        ) : null}

        {/* Fallback/Overlay for Video or Error */}
        <div className={`absolute inset-0 flex items-center justify-center bg-space-900/50 ${imageUrl ? 'hidden' : 'flex'}`}>
          {apod.media_type === 'video' ? (
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          ) : (
            <span className="text-space-400 text-xs">Image Unavailable</span>
          )}
        </div>
      </div>

      <div className="p-3 sm:p-4 flex-grow flex flex-col justify-between">
        <div>
          <p className="text-xs text-accent-cyan font-mono mb-2">{formatDateShort(apod.date)}</p>
          <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 group-hover:text-accent-cyan transition-colors">
            {apod.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ApodCard;

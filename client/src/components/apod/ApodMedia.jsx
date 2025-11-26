const ApodMedia = ({ apod, className = '' }) => {
  // Extract video ID from various video URL formats
  const getVideoEmbedUrl = (url) => {
    if (!url) return null;

    // YouTube patterns
    const youtubePatterns = [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
      /youtube\.com\/embed\/([^"&?\/\s]{11})/,
    ];

    for (const pattern of youtubePatterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}?rel=0`;
      }
    }

    // Vimeo pattern
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    // If it's already an embed URL, return as-is
    if (url.includes('embed') || url.includes('player')) {
      return url;
    }

    return null;
  };

  // Handle video and "other" media types (interactive content)
  if (apod.media_type === 'video' || apod.media_type === 'other') {
    // No URL available - show placeholder
    if (!apod.url) {
      return (
        <div className={`relative w-full bg-space-800 rounded-lg flex items-center justify-center ${className}`} style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <svg className="w-16 h-16 text-space-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-space-300 text-lg font-medium">Interactive Content</p>
            <p className="text-space-500 text-sm mt-2">This content cannot be displayed inline</p>
          </div>
        </div>
      );
    }

    const embedUrl = getVideoEmbedUrl(apod.url);

    if (embedUrl) {
      return (
        <div className={`relative w-full ${className}`} style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={embedUrl}
            title={apod.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      );
    }

    // Fallback for direct video files or unknown URLs
    if (apod.url.match(/\.(mp4|webm|ogg)$/i)) {
      return (
        <video controls className={`w-full rounded-lg ${className}`}>
          <source src={apod.url} />
          Your browser does not support the video tag.
        </video>
      );
    }

    // For other URLs (like interactive content), show link
    return (
      <div className={`relative w-full bg-space-800 rounded-lg flex items-center justify-center ${className}`} style={{ paddingBottom: '56.25%' }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <svg className="w-16 h-16 text-accent-cyan mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <p className="text-space-300 text-lg font-medium mb-4">External Content</p>
          <a
            href={apod.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View Content →
          </a>
        </div>
      </div>
    );
  }

  // Image type
  return (
    <img
      src={apod.url}
      alt={apod.title}
      className={`w-full h-auto rounded-lg ${className}`}
      loading="lazy"
    />
  );
};

export default ApodMedia;

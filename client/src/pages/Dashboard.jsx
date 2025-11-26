import { useApod } from '../hooks/useApod';
import { formatDate } from '../utils/dateUtils';
import ApodMedia from '../components/apod/ApodMedia';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { data, loading, error, refetch } = useApod();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  if (!data) return null;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl md:rounded-3xl overflow-hidden glass-panel min-h-[50vh] md:min-h-[70vh] flex items-end p-4 sm:p-8 md:p-12 group">
        {/* Background Image/Media */}
        <div className="absolute inset-0 z-0">
          {data.media_type === 'image' ? (
            <img
              src={data.hdurl || data.url}
              alt={data.title}
              className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <ApodMedia apod={data} className="w-full h-full" />
            </div>
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/60 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
              <span className="px-2 md:px-3 py-1 rounded-full bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan text-[10px] md:text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                APOD
              </span>
              <span className="text-space-200 text-xs md:text-sm font-medium">
                {formatDate(data.date)}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              {data.title}
            </h1>

            <p className="text-space-100 text-sm sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-6 md:mb-8 line-clamp-4 md:line-clamp-3 hover:line-clamp-none transition-all duration-300">
              {data.explanation}
            </p>

            <div className="flex flex-wrap gap-4">
              {data.hdurl && (
                <a
                  href={data.hdurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View Full HD
                </a>
              )}
              <Link to="/explorer" className="btn-glass">
                Explore Archives
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="grid md:grid-cols-2 gap-6">
        <Link to="/gallery" className="glass-card p-8 rounded-2xl group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">Browse Gallery</h3>
          <p className="text-space-300 mb-6 max-w-xs">Discover the cosmos through our curated collection of recent astronomy pictures.</p>
          <span className="text-accent-cyan font-medium flex items-center gap-2 group-hover:gap-4 transition-all">
            View Gallery →
          </span>
        </Link>

        <Link to="/explorer" className="glass-card p-8 rounded-2xl group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">Time Explorer</h3>
          <p className="text-space-300 mb-6 max-w-xs">Travel back in time to see what NASA discovered on your special dates.</p>
          <span className="text-accent-cyan font-medium flex items-center gap-2 group-hover:gap-4 transition-all">
            Start Exploring →
          </span>
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;

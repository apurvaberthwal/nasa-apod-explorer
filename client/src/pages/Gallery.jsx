import { useState, useEffect } from 'react';
import { apodApi } from '../services/api';
import ApodCard from '../components/apod/ApodCard';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import ApodDetail from '../components/apod/ApodDetail';
import { motion } from 'framer-motion';

const Gallery = () => {
  const [selectedApod, setSelectedApod] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial load
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await apodApi.getHistory();
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <Loader />;

  if (data.length === 0 && !loading && !error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-white mb-4">No History Yet</h2>
        <p className="text-space-200 mb-8">Visit the Dashboard or Explorer to view images and build your history.</p>
      </div>
    );
  }

  if (error && data.length === 0) return <ErrorMessage error={error} />;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8 md:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold mb-4 text-white"
        >
          Viewing <span className="text-accent-cyan">History</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-space-200 text-lg max-w-2xl mx-auto"
        >
          A collection of all the astronomy pictures you have visited. Showing {data.length} images.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {data.map((apod, index) => (
          <motion.div
            key={apod.date}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: Math.min(index * 0.03, 0.5) }}
          >
            <ApodCard
              apod={apod}
              onClick={() => setSelectedApod(apod)}
            />
          </motion.div>
        ))}
      </div>

      {selectedApod && (
        <ApodDetail
          apod={selectedApod}
          onClose={() => setSelectedApod(null)}
        />
      )}
    </div>
  );
};

export default Gallery;

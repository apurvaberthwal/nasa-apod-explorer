import { useState } from 'react';
import { useApod } from '../hooks/useApod';
import { TODAY, formatDate } from '../utils/dateUtils';
import ApodMedia from '../components/apod/ApodMedia';
import ErrorMessage from '../components/common/ErrorMessage';
import DatePicker from '../components/common/DatePicker';
import { DashboardSkeleton } from '../components/apod/ApodSkeleton';
import { motion, AnimatePresence } from 'framer-motion';

const Explorer = () => {
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const { data, loading, error, refetch } = useApod(selectedDate);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold mb-4 text-white"
        >
          Time <span className="text-accent-cyan">Explorer</span>
        </motion.h2>
        <p className="text-space-200 text-lg">Journey through the history of the cosmos</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-4 md:p-6 rounded-2xl max-w-2xl mx-auto"
      >
        <label className="block text-sm font-medium text-space-200 mb-3">
          Select Date
        </label>
        <DatePicker value={selectedDate} onChange={setSelectedDate} />
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DashboardSkeleton />
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ErrorMessage error={error} onRetry={refetch} />
          </motion.div>
        ) : data && (
          <motion.div
            key={data.date}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-3xl overflow-hidden p-4 sm:p-6 md:p-8"
          >
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <ApodMedia apod={data} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">{data.title}</h1>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 text-space-300">
                    <span className="font-mono text-accent-cyan">{formatDate(data.date)}</span>
                    {data.copyright && (
                      <>
                        <span className="hidden md:inline">•</span>
                        <span className="text-sm">© {data.copyright}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-space-100 leading-relaxed text-base md:text-lg">
                    {data.explanation}
                  </p>
                </div>

                {data.hdurl && data.media_type === 'image' && (
                  <div className="pt-4">
                    <a
                      href={data.hdurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      View Full Resolution
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Explorer;

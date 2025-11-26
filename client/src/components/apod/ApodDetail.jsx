import { formatDate } from '../../utils/dateUtils';
import ApodMedia from './ApodMedia';
import { motion } from 'framer-motion';

const ApodDetail = ({ apod, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-space-950/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl relative z-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex justify-between items-center p-6 bg-space-900/80 backdrop-blur-xl border-b border-white/5">
          <div>
            <h2 className="text-2xl font-bold text-white leading-tight">{apod.title}</h2>
            <p className="text-sm text-accent-cyan font-mono mt-1">{formatDate(apod.date)}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-space-300 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <ApodMedia apod={apod} className="w-full max-h-[60vh] object-contain mx-auto" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-space-400 border-b border-white/5 pb-4">
              <span>{apod.copyright ? `© ${apod.copyright}` : 'Public Domain'}</span>
              <span className="uppercase tracking-wider">{apod.media_type}</span>
            </div>

            <p className="text-space-100 leading-relaxed text-lg">
              {apod.explanation}
            </p>

            <div className="flex gap-4 pt-4">
              {apod.hdurl && apod.media_type === 'image' && (
                <a
                  href={apod.hdurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <span>View Full HD</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              )}
              <button onClick={onClose} className="btn-glass">
                Close Details
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ApodDetail;

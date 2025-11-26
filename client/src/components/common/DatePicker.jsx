import { FIRST_APOD_DATE } from '../../utils/dateUtils';

const DatePicker = ({ value, onChange, className = '' }) => {
  // Calculate today dynamically each time
  const getToday = () => new Date().toISOString().split('T')[0];

  const handlePrevious = () => {
    const currentDate = new Date(value);
    currentDate.setDate(currentDate.getDate() - 1);
    const newDate = currentDate.toISOString().split('T')[0];
    if (newDate >= FIRST_APOD_DATE) {
      onChange(newDate);
    }
  };

  const handleNext = () => {
    const currentDate = new Date(value);
    currentDate.setDate(currentDate.getDate() + 1);
    const newDate = currentDate.toISOString().split('T')[0];
    const today = getToday();
    if (newDate <= today) {
      onChange(newDate);
    }
  };

  const handleToday = () => {
    const today = getToday();
    onChange(today);
  };

  const handleRandom = () => {
    const start = new Date(FIRST_APOD_DATE).getTime();
    const end = new Date(getToday()).getTime();
    const randomTime = start + Math.random() * (end - start);
    const randomDate = new Date(randomTime).toISOString().split('T')[0];
    onChange(randomDate);
  };

  const today = getToday();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main date controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handlePrevious}
          disabled={value <= FIRST_APOD_DATE}
          className="btn-glass w-full sm:w-auto disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          aria-label="Previous day"
        >
          ← Prev
        </button>
        
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={FIRST_APOD_DATE}
          max={today}
          className="flex-1 bg-space-800/50 border border-white/10 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all"
        />
        
        <button
          onClick={handleNext}
          disabled={value >= today}
          className="btn-glass w-full sm:w-auto disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          aria-label="Next day"
        >
          Next →
        </button>
      </div>
      
      {/* Quick actions */}
      <div className="flex gap-3">
        <button 
          onClick={handleToday} 
          className="btn-glass text-sm flex-1 flex items-center justify-center gap-2"
        >
          📅 Today
        </button>
        <button 
          onClick={handleRandom} 
          className="btn-glass text-sm flex-1 flex items-center justify-center gap-2"
        >
          🎲 Random
        </button>
      </div>
      
      <p className="text-xs text-space-400 text-center">
        Available: June 16, 1995 — Today
      </p>
    </div>
  );
};

export default DatePicker;

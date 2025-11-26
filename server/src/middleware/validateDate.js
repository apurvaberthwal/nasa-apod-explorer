const FIRST_APOD_DATE = '1995-06-16';

const validateDate = (req, res, next) => {
  const { date } = req.params;
  const { start, end } = req.query;

  // Validate single date parameter
  if (date) {
    if (!isValidDateFormat(date)) {
      console.log(`⚠️  Validation failed: Invalid date format "${date}"`);
      return res.status(400).json({
        error: 'Invalid date format. Use YYYY-MM-DD',
        received: date,
        path: req.originalUrl,
      });
    }

    if (!isValidDateRange(date)) {
      console.log(`⚠️  Validation failed: Date "${date}" out of range`);
      return res.status(400).json({
        error: `Date must be between ${FIRST_APOD_DATE} and today`,
        received: date,
        path: req.originalUrl,
      });
    }
  }

  // Validate range parameters
  if (start || end) {
    if (!start || !end) {
      console.log(`⚠️  Validation failed: Missing range parameter (start: ${start}, end: ${end})`);
      return res.status(400).json({
        error: 'Both start and end dates are required for range queries',
        received: { start, end },
        path: req.originalUrl,
      });
    }

    if (!isValidDateFormat(start) || !isValidDateFormat(end)) {
      console.log(`⚠️  Validation failed: Invalid range format (start: ${start}, end: ${end})`);
      return res.status(400).json({
        error: 'Invalid date format. Use YYYY-MM-DD',
        received: { start, end },
        path: req.originalUrl,
      });
    }

    if (!isValidDateRange(start) || !isValidDateRange(end)) {
      console.log(`⚠️  Validation failed: Range dates out of bounds (start: ${start}, end: ${end})`);
      return res.status(400).json({
        error: `Dates must be between ${FIRST_APOD_DATE} and today`,
        received: { start, end },
        path: req.originalUrl,
      });
    }

    if (new Date(start) > new Date(end)) {
      console.log(`⚠️  Validation failed: Start date after end date (start: ${start}, end: ${end})`);
      return res.status(400).json({
        error: 'Start date must be before or equal to end date',
        received: { start, end },
        path: req.originalUrl,
      });
    }
  }

  next();
};

function isValidDateFormat(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

function isValidDateRange(dateString) {
  const date = new Date(dateString);
  const firstApod = new Date(FIRST_APOD_DATE);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  return date >= firstApod && date <= today;
}

export default validateDate;

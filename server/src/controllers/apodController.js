import cacheManager from '../cache/cacheManager.js';

const apodController = {
  // GET /api/apod - Today's APOD
  async getToday(req, res, next) {
    try {
      console.log('📡 Fetching today\'s APOD...');
      const data = await cacheManager.getOrFetch();
      console.log(`✓ Retrieved APOD for ${data.date}`);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/apod/:date - APOD by specific date
  async getByDate(req, res, next) {
    try {
      const { date } = req.params;
      console.log(`📡 Fetching APOD for ${date}...`);
      const data = await cacheManager.getOrFetch(date);
      console.log(`✓ Retrieved APOD for ${data.date} (${data.media_type})`);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/apod/range?start=YYYY-MM-DD&end=YYYY-MM-DD - APOD range
  async getRange(req, res, next) {
    try {
      const { start, end } = req.query;
      console.log(`📡 Fetching APOD range: ${start} to ${end}...`);
      const data = await cacheManager.getOrFetchRange(start, end);
      console.log(`✓ Retrieved ${data.length} APODs`);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/apod/history - All cached APODs
  async getHistory(req, res, next) {
    try {
      console.log('📡 Fetching APOD history...');
      const data = await cacheManager.getHistory();
      console.log(`✓ Retrieved ${data.length} cached APODs`);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/health - Health check
  async healthCheck(req, res) {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  },
};

export default apodController;

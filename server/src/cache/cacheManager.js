import apodRepository from '../database/apodRepository.js';
import nasaService from '../services/nasaService.js';

const cacheManager = {
  // Get single APOD (cache-first)
  async getOrFetch(date = null) {
    // If no date, fetch today from NASA directly
    if (!date) {
      const data = await nasaService.fetchApod();
      // Cache today's APOD
      apodRepository.set(data.date, data.title, data.media_type, data);
      apodRepository.pruneIfNeeded();
      return data;
    }

    // Check cache
    const cached = apodRepository.get(date);

    if (cached && apodRepository.isFresh(cached)) {
      return JSON.parse(cached.data);
    }

    // Cache miss or stale - fetch from NASA
    const data = await nasaService.fetchApod(date);
    apodRepository.set(data.date, data.title, data.media_type, data);
    apodRepository.pruneIfNeeded();

    return data;
  },

  // Optimized range fetch with bulk operations
  async getOrFetchRange(startDate, endDate) {
    // Generate all dates in range
    const dates = this.generateDateRange(startDate, endDate);

    // Bulk read from cache
    const cachedEntries = apodRepository.getMany(dates);

    // Filter fresh entries
    const freshCache = cachedEntries.filter(entry => apodRepository.isFresh(entry));
    const cachedDates = new Set(freshCache.map(entry => entry.date));

    // Calculate missing dates (Set Difference)
    const missingDates = dates.filter(date => !cachedDates.has(date));

    // Fetch missing dates from NASA (using range endpoint with thumbs=true)
    let fetchedData = [];
    if (missingDates.length > 0) {
      // Use NASA's range endpoint for efficiency
      fetchedData = await nasaService.fetchApodByDateRange(
        missingDates[0],
        missingDates[missingDates.length - 1]
      );

      // Bulk insert in single transaction
      apodRepository.setMany(fetchedData);

      // Run cleanup once after bulk insert
      apodRepository.pruneIfNeeded();
    }

    // Combine cached and fetched data
    const cachedData = freshCache.map(entry => JSON.parse(entry.data));
    const allData = [...cachedData, ...fetchedData];

    // Sort by date descending
    allData.sort((a, b) => new Date(b.date) - new Date(a.date));

    return allData;
  },

  // Get all history from cache
  async getHistory() {
    const cachedEntries = apodRepository.getAll();
    return cachedEntries.map(entry => JSON.parse(entry.data));
  },

  // Generate array of dates between start and end
  generateDateRange(startDate, endDate) {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split('T')[0]);
    }

    return dates;
  },
};

export default cacheManager;

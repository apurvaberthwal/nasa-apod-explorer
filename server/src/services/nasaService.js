import axios from 'axios';
import config from '../config/index.js';

const nasaService = {
  // Fetch single APOD
  async fetchApod(date = null) {
    try {
      const params = {
        api_key: config.nasa.apiKey,
      };

      if (date) {
        params.date = date;
      }

      const response = await axios.get(config.nasa.baseUrl, { params });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`NASA API Error: ${error.response.status} - ${error.response.data.msg || error.response.statusText}`);
      }
      throw new Error(`NASA API Request Failed: ${error.message}`);
    }
  },

  // Fetch multiple APODs in parallel with concurrency limit
  async fetchApodRange(dates) {
    const CONCURRENCY_LIMIT = 5;
    const results = [];

    // Process in batches to respect rate limits
    for (let i = 0; i < dates.length; i += CONCURRENCY_LIMIT) {
      const batch = dates.slice(i, i + CONCURRENCY_LIMIT);
      const batchPromises = batch.map(date => this.fetchApod(date));
      
      try {
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
      } catch (error) {
        throw error;
      }
    }

    return results;
  },

  // Fetch range using NASA's start_date/end_date params (with thumbs for videos)
  async fetchApodByDateRange(startDate, endDate) {
    try {
      const params = {
        api_key: config.nasa.apiKey,
        start_date: startDate,
        end_date: endDate,
        thumbs: true, // Get thumbnails for videos
      };

      const response = await axios.get(config.nasa.baseUrl, { params });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`NASA API Error: ${error.response.status} - ${error.response.data.msg || error.response.statusText}`);
      }
      throw new Error(`NASA API Request Failed: ${error.message}`);
    }
  },
};

export default nasaService;

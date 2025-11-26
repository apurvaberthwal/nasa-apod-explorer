import { useState, useEffect } from 'react';
import { apodApi } from '../services/api';
import { getCache, setCache } from '../utils/requestCache';

export const useApodRange = (startDate, endDate) => {
  const cacheKey = `apod-range-${startDate}-${endDate}`;
  const cached = getCache(cacheKey);

  const [data, setData] = useState(cached || []);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRange = async () => {
      if (!startDate || !endDate) return;
      
      // If we initialized with cache, we're good
      if (cached) return;

      const currentCache = getCache(cacheKey);
      if (currentCache) {
        setData(currentCache);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await apodApi.getRange(startDate, endDate);
        setCache(cacheKey, response.data);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to fetch APOD range');
      } finally {
        setLoading(false);
      }
    };

    fetchRange();
  }, [startDate, endDate]);

  return { data, loading, error };
};

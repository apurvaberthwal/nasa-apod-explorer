import { useState, useEffect, useCallback } from 'react';
import { apodApi } from '../services/api';

export const useApod = (date = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApod = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = date ? await apodApi.getByDate(date) : await apodApi.getToday();
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch APOD');
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchApod();
  }, [fetchApod]);

  return { data, loading, error, refetch: fetchApod };
};

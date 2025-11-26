import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const apodApi = {
  getToday: () => axios.get(`${API_BASE}/apod`),
  getByDate: (date) => axios.get(`${API_BASE}/apod/${date}`),
  getRange: (start, end) => axios.get(`${API_BASE}/apod/range`, { params: { start, end } }),
  getHistory: () => axios.get(`${API_BASE}/apod/history`),
  healthCheck: () => axios.get(`${API_BASE}/health`),
};

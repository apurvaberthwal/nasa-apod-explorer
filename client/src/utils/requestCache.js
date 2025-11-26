const cache = new Map();
const TIMEOUT = 1000 * 60 * 5; // 5 minutes

export const getCache = (key) => {
  const item = cache.get(key);
  if (!item) return null;
  
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  
  return item.data;
};

export const setCache = (key, data) => {
  cache.set(key, {
    data,
    expiry: Date.now() + TIMEOUT
  });
};

export const clearCache = () => {
  cache.clear();
};


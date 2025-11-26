import dotenv from 'dotenv';

dotenv.config();

const config = {
  nasa: {
    apiKey: process.env.NASA_API_KEY,
    baseUrl: 'https://api.nasa.gov/planetary/apod',
  },
  server: {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  cache: {
    ttlHours: parseInt(process.env.CACHE_TTL_HOURS) || 24,
    maxSize: parseInt(process.env.CACHE_MAX_SIZE) || 100,
  },
};

// Validate required config
if (!config.nasa.apiKey) {
  throw new Error('NASA_API_KEY is required in .env file');
}

export default config;

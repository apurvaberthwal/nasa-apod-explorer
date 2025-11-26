import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import apodRoutes from './routes/apodRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusEmoji = res.statusCode >= 400 ? '❌' : '✅';
    console.log(`${statusEmoji} ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });

  next();
});

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Allow any localhost origin for development
    if (origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());

// Routes
app.use('/api', apodRoutes);

// 404 handler
app.use((req, res) => {
  console.log(`⚠️  404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    availableEndpoints: [
      'GET /api/health',
      'GET /api/apod',
      'GET /api/apod/:date',
      'GET /api/apod/range?start=YYYY-MM-DD&end=YYYY-MM-DD',
    ],
  });
});

// Error handling
app.use(errorHandler);

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🚀 NASA APOD Server running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${config.server.nodeEnv}`);
  console.log(`💾 Cache: TTL=${config.cache.ttlHours}h, Max=${config.cache.maxSize} entries`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

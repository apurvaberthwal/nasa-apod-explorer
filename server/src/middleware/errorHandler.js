const errorHandler = (err, req, res, next) => {
  // Log error details to server console
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('❌ Error occurred:');
  console.error('   Path:', req.method, req.originalUrl);
  console.error('   Message:', err.message);
  console.error('   Stack:', err.stack);
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // NASA API errors
  if (err.message.includes('NASA API Error')) {
    const statusMatch = err.message.match(/(\d{3})/);
    const status = statusMatch ? parseInt(statusMatch[1]) : 500;
    
    console.log(`⚠️  Responding with status ${status}`);
    
    return res.status(status).json({
      error: err.message,
      path: req.originalUrl,
    });
  }

  // Rate limit errors
  if (err.message.includes('429') || err.message.includes('rate limit')) {
    console.log('⚠️  Responding with status 429 (Rate Limit)');
    
    return res.status(429).json({
      error: 'NASA API rate limit exceeded. Please try again later.',
      path: req.originalUrl,
    });
  }

  // Default server error
  console.log('⚠️  Responding with status 500 (Internal Server Error)');
  
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    path: req.originalUrl,
  });
};

export default errorHandler;

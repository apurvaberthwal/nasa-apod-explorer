import express from 'express';
import apodController from '../controllers/apodController.js';
import validateDate from '../middleware/validateDate.js';

const router = express.Router();

// Health check
router.get('/health', apodController.healthCheck);

// APOD endpoints
router.get('/apod/history', apodController.getHistory);
router.get('/apod/range', validateDate, apodController.getRange);
router.get('/apod/:date', validateDate, apodController.getByDate);
router.get('/apod', apodController.getToday);

export default router;

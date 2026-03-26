import express from 'express';
import {
  getProfileReport,
  getCachedReport,
  compareProfiles,
} from '../controllers/profileController.js';
import checkCache from '../middleware/cache.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get full profile report (checks cache first)
router.get('/profile/:username', checkCache, getProfileReport);

// Get cached report only
router.get('/profile/:username/cached', getCachedReport);

// Compare two profiles
router.get('/compare', compareProfiles);

export default router;
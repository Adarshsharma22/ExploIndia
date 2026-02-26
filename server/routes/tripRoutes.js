import express from 'express';
import { createTrip, getUserTrips, toggleFavorite, updateTrip } from '../controllers/tripController.js';
import { authenticate } from '../middlewares/auth.js';
import Trip from '../models/Trip.js';
import upload from '../middlewares/multer.js';

const router = express.Router();
// Get All Public Trips (Global Feed)
// Get ALL public trips (global feed for home page)
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find()
      .sort({ createdAt: -1 }) // Newest first
      .populate('user', 'username profilePic fullName') // Get real user details
      .limit(20); // Prevent loading thousands at once

    res.json(trips);
  } catch (error) {
    console.error('Error fetching all trips:', error);
    res.status(500).json({ message: 'Server error while fetching trips' });
  }
});

// const upload = multer({ storage: multer.memoryStorage() });



router.post('/create', authenticate, upload.array('images', 5), createTrip); 
router.put('/:id', authenticate, upload.array('images', 5), updateTrip);
router.get('/user/:userId', getUserTrips);
router.put('/favorite/:tripId', authenticate, toggleFavorite);

export default router;
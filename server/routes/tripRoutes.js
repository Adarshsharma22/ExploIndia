import express from 'express';
import { createTrip, getUserTrips, toggleComment, toggleFavorite, updateTrip, toggleLike, toggleDelet } from '../controllers/tripController.js';
import { authenticate } from '../middlewares/auth.js';
import Trip from '../models/Trip.js';
import upload from '../middlewares/multer.js';

const router = express.Router();


// ==================== GET ALL TRIPS ====================
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find()
      .sort({ createdAt: -1 })
      .populate('user', 'username profilePic fullName')
      .limit(20);

    res.json(trips);

  } catch (error) {
    console.error('Error fetching all trips:', error);
    res.status(500).json({ message: 'Server error while fetching trips' });
  }
});


router.get('/user/:userId', getUserTrips);
router.post('/create', authenticate, upload.array('images', 5), createTrip);
router.put("/like/:id", authenticate, toggleLike);
router.post("/:id/comment", authenticate,toggleComment);
router.put('/favoriteTrips/:tripId', authenticate, toggleFavorite);
router.put('/:id', authenticate, upload.array('images', 5), updateTrip);
router.delete("/:id", authenticate, toggleDelet);


router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("user", "username profilePic");

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json(trip);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
import express from 'express';
import { createTrip, getUserTrips, toggleFavorite, updateTrip } from '../controllers/tripController.js';
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


// ==================== USER TRIPS ====================
router.get('/user/:userId', getUserTrips);


// ==================== CREATE TRIP ====================
router.post('/create', authenticate, upload.array('images', 5), createTrip);


// ==================== LIKE TOGGLE ====================
router.put("/like/:id", authenticate, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    const userId = req.userId;
    const index = trip.likes.indexOf(userId);

    if (index > -1) {
      trip.likes.splice(index, 1);
    } else {
      trip.likes.push(userId);
    }

    await trip.save();

    res.json({
      success: true,
      likes: trip.likes.length,
      liked: index === -1
    });

  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ==================== ADD COMMENT ====================
router.post("/:id/comment", authenticate, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const newComment = {
      user: req.userId,
      text: req.body.text,
      createdAt: new Date()
    };

    trip.comments.push(newComment);
    await trip.save();

    const populatedTrip = await Trip.findById(req.params.id)
      .populate("comments.user", "username profilePic");

    const comment = populatedTrip.comments[populatedTrip.comments.length - 1];

    res.json(comment);

  } catch (error) {
    console.error("Comment error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ==================== FAVORITE TRIP ====================
router.put('/favorite/:tripId', authenticate, toggleFavorite);


// ==================== UPDATE TRIP ====================
router.put('/:id', authenticate, upload.array('images', 5), updateTrip);


// ==================== DELETE TRIP ====================
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.json({ message: "Trip deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ==================== GET SINGLE TRIP ====================
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
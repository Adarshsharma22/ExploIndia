import express from 'express';
import { createTrip, getUserTrips, toggleComment, toggleFavorite, updateTrip, toggleLike, toggleDelet, toggleView } from '../controllers/tripController.js';
import { authenticate } from '../middlewares/auth.js';
import Trip from '../models/Trip.js';
import upload from '../middlewares/multer.js';
import User from '../models/User.js';

const router = express.Router();


// ==================== GET ALL TRIPS ====================
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('user', 'username profilePic fullName')
      .lean(); // ✅ IMPORTANT

    // 🔥 MANUAL POPULATE COMMENTS
    const userIds = [
      ...new Set(
        trips.flatMap(trip =>
          trip.comments.map(c => c.user.toString())
        )
      )
    ];

    const users = await User.find({ _id: { $in: userIds } })
      .select('username profilePic fullName')
      .lean();

    const userMap = {};
    users.forEach(u => {
      userMap[u._id.toString()] = u;
    });

    const finalTrips = trips.map(trip => ({
      ...trip,
      comments: trip.comments.map(c => ({
        ...c,
        user: userMap[c.user.toString()] || null
      }))
    }));

    res.json(finalTrips);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get('/user/:userId', getUserTrips);
router.post('/create', authenticate, upload.array('images', 5), createTrip);
router.put("/like/:id", authenticate, toggleLike);
router.post("/:id/comment", authenticate,toggleComment);
router.put('/favoriteTrips/:tripId', authenticate, toggleFavorite);
router.put('/:id', authenticate, upload.array('images', 5), updateTrip);
router.delete("/:id", authenticate, toggleDelet);
router.put("/view/:id", toggleView );


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
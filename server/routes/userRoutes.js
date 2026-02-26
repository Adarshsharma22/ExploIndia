import express from "express";
import { updateProfile, getProfile } from '../controllers/userController.js';
import { authenticate } from '../middlewares/auth.js'; 
import User from '../models/User.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// Get current user ( /me – for auth verification)
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Suggested Users for Right Sidebar
router.get('/suggested', authenticate, async (req, res) => {
  try {
    const currentUserId = req.userId;

    // Get 5 random users who are NOT the current user
    const suggestedUsers = await User.find({
      _id: { $ne: currentUserId }           // Not current user
    })
    .select('fullName username profilePic bio')   // Only needed fields
    .limit(5);

    res.json(suggestedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get profile by ID
router.get('/:id', getProfile);

// Update profile
router.put('/update', authenticate, upload.fields([{ name: 'userDP', maxCount: 1 }, { name: 'backgroundImage', maxCount: 1 }]), updateProfile);

export default router;
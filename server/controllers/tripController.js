import Trip from '../models/Trip.js';
import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';

// Create Trip
export const createTrip = async (req, res) => {
  try {
    const images = [];
    if (req.files?.images) {
      for (const file of req.files.images) {
        const result = await cloudinary.uploader.upload(file.buffer.toString('base64'), { folder: 'exploindia/posts' });
        images.push(result.secure_url);
      }
    }

    const trip = new Trip({
      user: req.userId,
      title: req.body.title,
      description: req.body.description,
      images,
    });

    await trip.save();
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Trips (with populated user fields)
export const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('user', 'username profilePic fullName');  // Populate username, profilePic, fullName to avoid "Anonymous User"
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark as Favorite (toggle)
export const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const tripId = req.params.tripId;

    if (user.favoritePosts.includes(tripId)) {
      user.favoritePosts = user.favoritePosts.filter(id => id.toString() !== tripId);
    } else {
      user.favoritePosts.push(tripId);
    }

    await user.save();
    res.json(user.favoritePosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Trip by ID (with populated user)
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('user', 'username profilePic fullName');  // Populate user data
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Trip
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.user.toString() !== req.userId) return res.status(403).json({ message: 'Unauthorized' });

    // Handle image updates (append new, or replace -- for simplicity, replace all)
    const images = trip.images;
    if (req.files?.images) {
      images.length = 0;  // Clear old
      for (const file of req.files.images) {
        const result = await cloudinary.uploader.upload(file.buffer.toString('base64'), { folder: 'exploindia/posts' });
        images.push(result.secure_url);
      }
    }

    trip.title = req.body.title || trip.title;
    trip.description = req.body.description || trip.description;
    trip.location = req.body.location || trip.location;

    await trip.save();
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import Trip from '../models/Trip.js';
import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';
import Notification from "../models/Notification.js"; 

// Create Trip
export const createTrip = async (req, res) => {
  try {
    const images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {

        const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(base64Image, {
          folder: 'exploindia/posts',
        });

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

    // ✅ Create notification AFTER saving
    await Notification.create({
      recipient: req.userId,
      sender: req.userId,
      type: "NEW_TRIP",
      message: "You added a new trip",
      trip: trip._id
    });

    res.json(trip);

  } catch (error) {
    console.error("Create trip error:", error);
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

    if (user.favoriteTrips.includes(tripId)) {
      user.favoriteTrips = user.favoriteTrips.filter(id => id.toString() !== tripId);
    } else {
      user.favoriteTrips.push(tripId);
    }

    await user.save();
    res.json(user.favoriteTrips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delet
export const toggleDelet = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Trip.findByIdAndDelete(req.params.id);

    await Notification.create({
      recipient: req.userId,
      sender: req.userId,
      type: "TRIP_DELETED",
      message: "Your trip was deleted"
    });

    res.json({ message: "Trip deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// like 
export const toggleLike = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    const userId = req.userId;

    // ✅ FIX: compare properly
    const alreadyLiked = trip.likes.some(
      id => id.toString() === userId
    );

    if (alreadyLiked) {
      trip.likes = trip.likes.filter(
        id => id.toString() !== userId
      );
    } else {
      trip.likes.push(userId);
    }

    await trip.save();

    res.json({
      success: true,
      likes: trip.likes.length,
      liked: !alreadyLiked
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//comment 
export const toggleComment = async (req, res) => {
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
    
    if (trip.user._id.toString() !== req.userId) {
      await Notification.create({
        recipient: trip.user._id, // trip owner
        sender: req.userId,       // commenter
        type: "NEW_COMMENT",
        message: "commented on your trip",
        trip: trip._id
      });
    }

    const populatedTrip = await Trip.findById(req.params.id)
      .populate("comments.user", "username profilePic");

    const comment = populatedTrip.comments[populatedTrip.comments.length - 1];

    res.json(comment);

  } catch (error) {
    console.error("Comment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Trip by ID (with populated user)
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('user', 'username profilePic fullName')
      .populate('comments.user', 'username profilePic');  // Populate user data
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

    await Notification.create({
      recipient: req.userId,
      sender: req.userId,
      type: "TRIP_UPDATED",
      message: "Your trip was updated",
      trip: trip._id
    });

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


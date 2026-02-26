import User from '../models/User.js';
import mongoose from 'mongoose';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';
import jwt from 'jsonwebtoken'; 

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create/Update Profile
export const updateProfile = async (req, res) => {
  console.log("🔥 UPDATE PROFILE ROUTE HIT");
  console.log("FILES:", req.files);
  console.log("BODY:", req.body);
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Handle image uploads
    let userDPUrl = user.userDP;
    let backgroundUrl = user.backgroundImage;

    if (req.files?.userDP) {
  const base64Image = `data:${req.files.userDP[0].mimetype};base64,${req.files.userDP[0].buffer.toString('base64')}`;

  const result = await cloudinary.uploader.upload(base64Image, {
    folder: 'exploindia/profiles'
  });

  userDPUrl = result.secure_url;
}



   if (req.files?.backgroundImage) {
  const base64Image = `data:${req.files.backgroundImage[0].mimetype};base64,${req.files.backgroundImage[0].buffer.toString('base64')}`;

  const result = await cloudinary.uploader.upload(base64Image, {
    folder: 'exploindia/backgrounds'
  });

  backgroundUrl = result.secure_url;
}



    // Update fields
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.location = req.body.location || user.location;
    user.bio = req.body.bio || user.bio;
    user.profilePic = userDPUrl;
    user.coverPic = backgroundUrl;
    user.travelerInfo = req.body.travelerInfo ? JSON.parse(req.body.travelerInfo) : user.travelerInfo;

    await user.save();
    res.json(user);
  } catch (error) {
  console.error("UPDATE PROFILE ERROR:");
  console.error(error);
  res.status(500).json({ message: error.message });
}
};

// Get Profile
export const getProfile = async (req, res) => {
  const { id } = req.params;
  if (!id || id === 'undefined' || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid or missing user ID' });
  }
  try {
    const user = await User.findById(id).populate('followers following favoritePosts');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
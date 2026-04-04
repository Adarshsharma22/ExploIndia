import User from "../models/User.js";
import Trip from "../models/Trip.js";

export const searchAll = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.json({ users: [], trips: [] });
    }

    // 👤 Users (username + fullName ONLY)
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { fullName: { $regex: query, $options: "i" } }
      ]
    }).select("username fullName profilePic");

    // 🧳 Trips (title ONLY)
    const trips = await Trip.find({
      title: { $regex: query, $options: "i" }
    }).populate("user", "username fullName profilePic");

    res.json({ users, trips });

  } catch (error) {
    console.error("SEARCH ERROR:", error); // 👈 important
    res.status(500).json({ message: "Search failed" });
  }
};
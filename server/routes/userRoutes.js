import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* ---------------- GET USER PROFILE ---------------- */
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

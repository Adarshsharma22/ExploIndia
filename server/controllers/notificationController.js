import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {

    const notifications = await Notification
      .find({ recipient: req.userId })
      .populate("sender", "username profilePic")
      .populate("trip", "title")
      .sort({ createdAt: -1 });

    res.json(notifications);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const markAsRead = async (req, res) => {

  try {

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.json(notification);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  type: {
    type: String,
    enum: [
      "NEW_TRIP",
      "TRIP_UPDATED",
      "TRIP_DELETED",
      "NEW_USER",
      "FRIEND_REQUEST"
    ],
    required: true
  },

  message: {
    type: String
  },

  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip"
  },

  isRead: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
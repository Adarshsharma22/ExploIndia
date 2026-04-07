import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  lastMessage: { type: String },
  lastMessageSender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // Track unread per user
  unreadCounts: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      count: { type: Number, default: 0 }
    }
  ],
  lastMessageAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Conversation", conversationSchema);
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  conversationId: {   // ✅ ADD THIS
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
  }
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
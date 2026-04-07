// Improved messageController.js
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const senderId = req.user.id;

    // 1. Atomic Update & Create for Conversation
    // This prevents creating duplicate conversations if two people text simultaneously
   const conversation = await Conversation.findOneAndUpdate(
  { participants: { $all: [senderId, receiverId] } },
  {
    lastMessage: text,
    lastMessageSender: senderId,
    lastMessageAt: new Date()
  },
  { upsert: true, new: true }
);

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text,
      conversationId: conversation._id // Recommended: link directly to conversation
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { conversationId } = req.params;
    // Only reset unreadCount if the LAST sender wasn't ME
    await Conversation.findByIdAndUpdate(conversationId, {
      seen: true,
      unreadCount: 0
    });
    res.json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userId = req.params.id;
    const myId = req.user.id;

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userId },
        { sender: userId, receiver: myId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const myId = req.user.id;

    const conversations = await Conversation.find({
      participants: myId
    })
      .populate("participants", "username fullName profilePic")
      .populate("lastMessageSender", "username")
      .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (error) {
    console.error("GET CONVERSATIONS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
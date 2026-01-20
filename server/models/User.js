import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },

    stats: {
      posts: { type: Number, default: 0 },
      followers: { type: Number, default: 0 },
      following: { type: Number, default: 0 },
      tripsCompleted: { type: Number, default: 0 },
    },

    travelInfo: {
      favoriteType: String,
      interests: [String],
      statesVisited: Number,
      countriesVisited: Number,
      bucketList: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

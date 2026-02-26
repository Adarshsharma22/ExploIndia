import mongoose from "mongoose";

const travelerInfoSchema = new mongoose.Schema({  
  favoriteTravelType: { type: [String], default: [] }, 
  favoriteTraveledPlace: { type: String, default: '' },
  travelInterests: { type: [String], default: [] }, 
  placesVisited: { type: [String], default: [] },
  statesVisited: { type: [String], default: [] },
  bucketList: { type: [String], default: [] }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true, trim: true, }, 
  location: { type: String, default: '' },
  bio: { type: String, default: '' },
  profilePic: { type: String, default: 'default-profile.jpg' }, // URL to image
  coverPic: { type: String, default: 'default-cover.jpg' }, // URL to background image
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  travelerInfo: travelerInfoSchema,  
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
  favoritePosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
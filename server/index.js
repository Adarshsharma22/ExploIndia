// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';  // ← changed from postRoutes
import path from 'path'; 
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://fm096qfx-5173.inc1.devtunnels.ms"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  credentials: true
}));



app.use(express.json());

// Routes
app.use("/api/notifications", notificationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);          // ← use /api/trips (or keep /api/posts if you rename back)

// Test route
app.get('/', (req, res) => {
  res.send('ExploIndia backend running 🚀');
});


// Connect to DB (only once)
connectDB()
  .then(() => console.log('MongoDB Atlas Connected'))
  .catch((err) => console.error('❌ Database Connection Error: ', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
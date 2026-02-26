// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';  // ← changed from postRoutes
import path from 'path'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
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
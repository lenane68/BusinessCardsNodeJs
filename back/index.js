import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/usersRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import errorLogger from './middleware/errorLogger.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(morgan('combined'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);
app.use(errorLogger);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Business Cards API!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

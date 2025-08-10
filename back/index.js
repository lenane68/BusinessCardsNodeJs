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

const isProduction = process.env.NODE_ENV === 'production';
const mongoURI = isProduction ? process.env.MONGO_URI_ATLAS : process.env.MONGO_URI_LOCAL;

const allowedOrigins = ['http://localhost:3000', 'https://your-production-site.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
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
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Connected to ${isProduction ? 'Atlas' : 'Local'} MongoDB`);
    app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  description: String,
  phone: { type: String, required: true },
  email: String,
  web: String,
  image: {
    url: String,
    alt: String
  },
  address: {
    city: String,
    street: String,
    houseNumber: Number
  },
  bizNumber: { type: Number, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model('Card', cardSchema);

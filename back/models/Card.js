import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  web: { type: String, required: true },
  image: {
    url: { type: String, default: '' },
    alt: { type: String, default: '' }
  },
  address: {
    state: { type: String, default: '' },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    zip: { type: String, default: '' }
  },
  bizNumber: { type: Number, required: true, unique: true },
  likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Card', cardSchema);

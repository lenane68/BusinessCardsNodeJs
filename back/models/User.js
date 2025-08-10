import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    middle: { type: String, default: '' },
    last: { type: String, required: true }
  },
  isBusiness: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    state: { type: String, default: '' },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    zip: { type: String, default: '' }
  },
  image: {
    url: { type: String, default: '' },
    alt: { type: String, default: '' }
  },
  failedLoginAttempts: { type: Number, default: 0 },
  isBlocked: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('User', userSchema);

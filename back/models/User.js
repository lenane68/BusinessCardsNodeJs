import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  address: {
    city: String,
    street: String,
    houseNumber: Number
  },
  isBusiness: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  failedLoginAttempts: { type: Number, default: 0 },
  isBlocked: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('User', userSchema);

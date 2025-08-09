import express from 'express';
import User from '../models/User.js';
import { userSchema } from '../validators/userValidator.js';
import { loginSchema } from '../validators/loginValidator.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/:id', authMiddleware, async (req, res) => {
  if (req.user._id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json(user);
});

router.put('/:id', authMiddleware, async (req, res) => {
  if (req.user._id !== req.params.id) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

router.patch('/:id', authMiddleware, async (req, res) => {
  if (req.user._id !== req.params.id) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.isBusiness = !user.isBusiness;
  await user.save();

  res.json({ isBusiness: user.isBusiness });
});

router.delete('/:id', authMiddleware, async (req, res) => {
  if (req.user._id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied' });
  }

  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

export default router;

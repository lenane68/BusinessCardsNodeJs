import express from 'express';
import Card from '../models/Card.js';
import { cardSchema } from '../validators/cardValidator.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { businessMiddleware } from '../middleware/businessMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, businessMiddleware, async (req, res) => {
  const { error } = cardSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const bizNumber = Math.floor(100000 + Math.random() * 900000);
  const card = new Card({ ...req.body, bizNumber, userId: req.user._id });
  await card.save();

  res.status(201).json({ message: `Card created by user ${req.user._id}` });
});

router.get('/', async (req, res) => {
  const cards = await Card.find();
  res.json(cards);
});

router.get('/my-cards', authMiddleware, async (req, res) => {
  const cards = await Card.find({ userId: req.user._id });
  res.json(cards);
});

router.get('/:id', async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      const error = new Error('Card not found');
      res.status(404);
      return next(error);
    }
    res.json(card);
  } catch (err) {
    res.status(500);
    next(err);
  }
});



router.put('/:id', authMiddleware, async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card) return res.status(404).json({ error: 'Card not found' });

  if (card.userId.toString() !== req.user._id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { error } = cardSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  if (req.body.bizNumber && req.user.isAdmin) {
    const existingCard = await Card.findOne({ bizNumber: req.body.bizNumber });
    if (existingCard && existingCard._id.toString() !== card._id.toString()) {
      return res.status(400).json({ error: 'bizNumber already exists' });
    }
    card.bizNumber = req.body.bizNumber;
  }

  card.title = req.body.title;
  card.subtitle = req.body.subtitle;
  card.description = req.body.description;
  card.phone = req.body.phone;
  card.email = req.body.email;
  card.web = req.body.web;
  card.image = req.body.image;
  card.address = req.body.address;

  await card.save();
  res.json(card);
});

router.patch('/:id', authMiddleware, async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card) return res.status(404).json({ error: 'Card not found' });

  const userId = req.user._id;
  const index = card.likes.indexOf(userId);

  if (index === -1) {
    card.likes.push(userId);
  } else {
    card.likes.splice(index, 1);
  }

  await card.save();
  res.json({ likes: card.likes });
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card) return res.status(404).json({ error: 'Card not found' });

  if (card.userId.toString() !== req.user._id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied' });
  }

  await Card.findByIdAndDelete(req.params.id);
  res.json({ message: 'Card deleted' });
});

export default router;

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async (req, res) => {

  try {
    const { name, email, password, phone, address, isBusiness,isAdmin } = req.body;

    if (!name || !email || !password) {
  return res.status(400).json({ error: 'Name, email, and password are required' });
}

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      isBusiness,
      isAdmin,
      failedLoginAttempts: 0,
      isBlocked: false
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ error: 'User is blocked due to multiple failed login attempts' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 3) {
        user.isBlocked = true;
      }
      await user.save();
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    user.failedLoginAttempts = 0;
    await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, isBusiness, isAdmin } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ error: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ error: 'User already exists' });
    }

    const user = new User({ name, email, password, isBusiness, isAdmin });
    await user.save();

    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Server error: ' + err.message });
  }
};

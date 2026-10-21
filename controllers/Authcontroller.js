const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const userResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

// POST /auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // NOTE: accepting "role" from the body is for this challenge only.
    // In production, never let clients choose their own role.
    const user = await User.create({ name, email, password, role });

    res.status(201).json({ user: userResponse(user), token: generateToken(user) });
  } catch (err) {
    next(err);
  }
};

// POST /auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    // Same message for both cases so attackers can't tell which emails exist
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ user: userResponse(user), token: generateToken(user) });
  } catch (err) {
    next(err);
  }
};

// GET /auth/profile
exports.getProfile = (req, res) => {
  res.json({ user: userResponse(req.user) });
};

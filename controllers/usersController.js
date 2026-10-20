const User = require('../models/User');

// 🟢 GET all users (Add this)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// 🟢 CREATE a new user (Add this)
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// UPDATE a user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// DELETE a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.send(`User with id ${id} deleted`);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

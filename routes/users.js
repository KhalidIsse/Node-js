const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/usersController');

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);     // 🔄 Update
router.delete('/:id', deleteUser);  // ❌ Delete

module.exports = router;

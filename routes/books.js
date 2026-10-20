const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/booksController');

// Routes mapped to /api/books
router.route('/')
  .get(getAllBooks)
  .post(createBook);

// Routes mapped to /api/books/:id
router.route('/:id')
  .get(getBookById)
  .put(updateBook)
  .delete(deleteBook);

module.exports = router;

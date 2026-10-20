const Book = require('../models/Book');

// @desc    Get all books (with optional filtering by year or genre)
// @route   GET /api/books
exports.getAllBooks = async (req, res) => {
  try {
    const queryObj = {};

    // Bonus: Filter by specific year
    if (req.query.year) {
      queryObj.publishedYear = Number(req.query.year);
    }

    // Bonus: Search/Filter by genre (case-insensitive regex)
    if (req.query.genre) {
      queryObj.genre = { $regex: req.query.genre, $options: 'i' };
    }

    const books = await Book.find(queryObj);
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get a specific book by ID
// @route   GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create a new book
// @route   POST /api/books
exports.createBook = async (req, res) => {
  try {
    // Mongoose schema validation will catch missing fields automatically
    const newBook = await Book.create(req.body);
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update a specific book
// @route   PUT /api/books/:id
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // returns the updated doc and runs schemas validations again
    );

    if (!updatedBook) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete a specific book
// @route   DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

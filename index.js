const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to automatically parse incoming JSON payloads
app.use(express.json());

// In-memory data store with structural mock data
let books = [
  { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 2, title: "1984", author: "George Orwell" }
];

// Helper variable to handle unique auto-incrementing tracking IDs safely
let nextId = 3;

// --- API ROUTES ---

/**
 * 1. GET /books
 * Description: Retrieve the entire list of books.
 */
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

/**
 * 2. GET /books/:id
 * Description: Get a single book by its dynamic ID path parameter.
 */
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(200).json(book);
});

/**
 * 3. POST /books
 * Description: Append a brand new book record.
 */
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  // Basic validation layer check
  if (!title || !author) {
    return res.status(400).json({ error: "Missing required properties: 'title' and 'author' are mandatory." });
  }

  const newBook = {
    id: nextId++,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

/**
 * 4. PUT /books/:id
 * Description: Completely update an existing book metadata profile by ID.
 */
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const { title, author } = req.body;

  // Validate the incoming body attributes
  if (!title || !author) {
    return res.status(400).json({ error: "Missing required payload values: 'title' and 'author' must be present." });
  }

  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  // Perform full updates on the array index object
  books[bookIndex] = { id: bookId, title, author };
  
  res.status(200).json(books[bookIndex]);
});

/**
 * 5. DELETE /books/:id
 * Description: Erase a book document resource completely by unique identifier.
 */
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  // Splice removes the target index element out of the active runtime memory array
  const deletedBook = books.splice(bookIndex, 1);
  
  res.status(200).json({ message: "Successfully deleted", book: deletedBook[0] });
});

// Start the Express application server instances
app.listen(PORT, () => {
  console.log(`Server running successfully on http://localhost:${PORT}`);
});

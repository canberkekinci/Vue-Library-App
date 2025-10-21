import db from "../db.js";

// @desc  Get all books for not logged in users.
// @path  GET /books
const getBooks = async (req, res, next) => {
  const { query } = req.query;
  try {
    const results = await db.query(
      "SELECT id, author, title, genre, description FROM books WHERE title ILIKE $1 OR author ILIKE $1 ORDER BY LOWER(title) ASC",
      [`%${query || ""}%`]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    const err = new Error("Error getting books data.");
    err.status = 500;
    return next(err);
  }
};

// @desc  Get all books with is_featured for not logged in users.
// @path  GET /books
const getBooksWithFeatured = async (req, res, next) => {
  const { query } = req.query;
  try {
    const results = await db.query(
      "SELECT id, author, title, genre, description, is_featured FROM books WHERE title ILIKE $1 OR author ILIKE $1 ORDER BY LOWER(title) ASC",
      [`%${query || ""}%`]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    const err = new Error("Error getting books data.");
    err.status = 500;
    return next(err);
  }
};

// @desc  Get all books with borrower id for not logged in users.
// @path  GET /books/with-borrow
const getBooksWithBorrow = async (req, res, next) => {
  const { query } = req.query;
  try {
    const results = await db.query(
      "SELECT id, author, title, genre, description, borrower_id FROM books WHERE title ILIKE $1 OR author ILIKE $1 ORDER BY LOWER(title) ASC",
      [`%${query || ""}%`]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    const err = new Error("Error getting books data.");
    err.status = 500;
    return next(err);
  }
};

// @desc    Get a book for not logged in users.
// @path    GET /books/:id
const getBook = async (req, res, next) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    const err = new Error("Invalid book id.");
    err.status = 400;
    return next(err);
  }
  try {
    const result = await db.query(
      "SELECT id, author, title, genre, description FROM books WHERE id = $1",
      [bookId]
    );
    if (result.rowCount === 0) {
      const err = new Error("Book not found.");
      err.status = 404;
      return next(err);
    }
    const book = result.rows[0];
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    const err = new Error("Error fetching book data.");
    err.status = 500;
    return next(err);
  }
};

// @desc    Get a book for not logged in users.
// @path    GET /books/:id
const getBookWithBorrow = async (req, res, next) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    const err = new Error("Invalid book id.");
    err.status = 400;
    return next(err);
  }
  try {
    const result = await db.query(
      "SELECT id, author, title, genre, description, borrower_id FROM books WHERE id = $1",
      [bookId]
    );
    if (result.rowCount === 0) {
      const err = new Error("Book not found.");
      err.status = 404;
      return next(err);
    }
    const book = result.rows[0];
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    const err = new Error("Error fetching book data.");
    err.status = 500;
    return next(err);
  }
};

// @desc    Get all books for logged in users.
// @path    GET /books/with-bookmarks
const getBooksAndBookmarks = async (req, res, next) => {
  if (!req.user) {
    const err = new Error("You need to log in.");
    err.status = 401;
    return next(err);
  }
  const user = req.user;
  try {
    const results = await db.query(
      "SELECT b.*, CASE WHEN bm.user_id IS NOT NULL THEN true ELSE false END AS is_bookmarked FROM books b INNER JOIN bookmarks bm  ON b.id = bm.book_id AND bm.user_id = $1",
      [user.id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    const err = new Error("Error getting books data.");
    err.status = 500;
    return next(err);
  }
};

// @desc    Get a book for logged in users.
// @path    GET /books/with-bookmarks/:id
const getBookAndBookmark = async (req, res, next) => {
  if (!req.user) {
    const err = new Error("You need to log in.");
    err.status = 401;
    return next(err);
  }
  const user = req.user;
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    const err = new Error("Invalid book id.");
    err.status = 400;
    return next(err);
  }
  try {
    const result = await db.query(
      "SELECT b.*, CASE WHEN bm.user_id IS NOT NULL THEN true ELSE false END AS is_bookmarked FROM books b LEFT JOIN bookmarks bm  ON b.id = bm.book_id AND bm.user_id = $1 WHERE b.id = $2",
      [user.id, bookId]
    );
    if (result.rowCount === 0) {
      const err = new Error("Book not found.");
      err.status = 404;
      return next(err);
    }
    const book = result.rows[0];
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    const err = new Error("Error getting book data.");
    err.status = 500;
    return next(err);
  }
};

// @desc  Bookmark a book.
// @path  /bookmark/:id
const bookmarkBook = async (req, res, next) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    const err = new Error("Book id is not valid.");
    err.status = 400;
    return next(err);
  }
  if (!req.user) {
    const err = new Error("You need to log in first.");
    err.status = 401;
    return next(err);
  }
  const user = req.user;
  try {
    await db.query("INSERT INTO bookmarks (user_id, book_id) VALUES ($1, $2)", [
      user.id,
      bookId,
    ]);
    res.status(200).json({ message: "Book is bookmarked." });
  } catch (error) {
    if (error.code === "23505") {
      const err = new Error("Book already bookmarked.");
      err.status = 409;
      return next(err);
    }
    console.error(error);
    const err = new Error("Error bookmarking book.");
    err.status = 500;
    return next(err);
  }
};

// @desc  Unbookmark a book.
// @path  /unbookmark/:id
const unBookmarkBook = async (req, res, next) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    const err = new Error("Book id is not valid.");
    err.status = 400;
    return next(err);
  }
  if (!req.user) {
    const err = new Error("You need to log in first.");
    err.status = 401;
    return next(err);
  }
  const user = req.user;
  try {
    const result = await db.query(
      "DELETE FROM bookmarks WHERE user_id = $1 AND book_id = $2 RETURNING *",
      [user.id, bookId]
    );
    if (result.rowCount === 0) {
      const err = new Error("This book is not bookmarked.");
      err.status = 404;
      return next(err);
    }
    res.status(200).json({ message: "Book is unbookmarked." });
  } catch (error) {
    console.error(error);
    const err = new Error("Error unbookmarking book.");
    err.status = 500;
    return next(err);
  }
};

// @desc  Borrow a book.
// @path  /borrow/:id
const borrowBook = async (req, res, next) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    const err = new Error("Book id is not valid.");
    err.status = 400;
    return next(err);
  }
  if (!req.user) {
    const err = new Error("You need to log in first.");
    err.status = 401;
    return next(err);
  }
  const user = req.user;
  try {
    await db.query("BEGIN"); // Begin transaction as we will have 2 queries and we would like to abort transaction and take everything back if one of the queries return with an error.
    const result = await db.query(
      "UPDATE books SET borrower_id = $2 WHERE id = $1 AND borrower_id IS NULL RETURNING *",
      [bookId, user.id]
    );
    if (result.rowCount === 0) {
      await db.query("ROLLBACK"); // Take everything back if error occurs.
      const err = new Error("Book is already borrowed or not found.");
      err.status = 409;
      return next(err);
    }
    await db.query("INSERT INTO borrows (user_id, book_id) VALUES ($1, $2)", [
      user.id,
      bookId,
    ]);
    await db.query("COMMIT"); // End transaction
    res.status(200).json({ message: "Book is borrowed successfully." });
  } catch (error) {
    console.error(error);
    await db.query("ROLLBACK"); // Take everything back if error occurs.
    const err = new Error("Error borrowing book.");
    err.status = 500;
    return next(err);
  }
};

// @desc  Return a book.
// @path  /return/:id
const returnBook = async (req, res, next) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    const err = new Error("Book id is not valid.");
    err.status = 400;
    return next(err);
  }
  if (!req.user) {
    const err = new Error("You need to log in first.");
    err.status = 401;
    return next(err);
  }
  const user = req.user;
  try {
    await db.query("BEGIN");
    const result = await db.query(
      "UPDATE books SET borrower_id = NULL WHERE id = $1 AND borrower_id = $2 RETURNING *",
      [bookId, user.id]
    );
    if (result.rowCount === 0) {
      await db.query("ROLLBACK");
      const err = new Error("Book is already not borrowed or not found.");
      err.status = 409;
      return next(err);
    }
    await db.query(
      "UPDATE borrows SET returned_at = NOW() WHERE user_id = $1 AND book_id = $2 AND returned_at IS NULL",
      [user.id, bookId]
    );
    await db.query("COMMIT");
    res.status(200).json({ message: "Book returned successfully." });
  } catch (error) {
    console.error(error);
    await db.query("ROLLBACK");
    const err = new Error("Error returning book.");
    err.status = 500;
    return next(err);
  }
};

const getFeaturedBooks = async (req, res, next) => {
  try {
    const results = await db.query(
      "SELECT * FROM books WHERE is_featured = TRUE"
    );
    if (results.rowCount === 0) {
      const err = new Error("No featured books available.");
      err.status = 404;
      return next(err);
    }
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    const err = new Error("Error getting featured books.");
    err.status = 500;
    return next(err);
  }
};

export {
  getBooks,
  getBooksWithBorrow,
  getBook,
  getBooksAndBookmarks,
  getBookAndBookmark,
  bookmarkBook,
  unBookmarkBook,
  borrowBook,
  returnBook,
  getFeaturedBooks,
  getBooksWithFeatured,
  getBookWithBorrow,
};

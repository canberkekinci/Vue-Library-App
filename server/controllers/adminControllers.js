import db from "../db.js";

// @desc    Create a book.
// @path    POST /admin/books
const addNewBook = async (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const genre = req.body.genre;
  let isFeatured = req.body.is_featured;

  if (!title) {
    const err = new Error("Title must be given.");
    err.status = 400;
    return next(err);
  }
  if (!author) {
    const err = new Error("Author must be given.");
    err.status = 400;
    return next(err);
  }
  if (!description) {
    const err = new Error("Description must be given.");
    err.status = 400;
    return next(err);
  }
  if (!genre) {
    const err = new Error("Genre must be given.");
    err.status = 400;
    return next(err);
  }
  if (isFeatured == null) {
    isFeatured = false;
  }

  try {
    const result = await db.query(
      "INSERT INTO books (title, author, description, genre, is_featured) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        title.trim(),
        author.trim(),
        description.trim(),
        genre.trim(),
        isFeatured,
      ]
    );
    res
      .status(201)
      .json({ message: "Book added successfully.", book: result.rows[0] });
  } catch (error) {
    console.error(error);
    const err = new Error("Error adding book.");
    err.status = 500;
    return next(err);
  }
};

// @desc    Update a book.
// @path    PUT /admin/books/:id
const updateBook = async (req, res, next) => {
  const bookId = parseInt(req.params.id);
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const genre = req.body.genre;

  if (isNaN(bookId)) {
    const err = new Error("Book id must be given.");
    err.status = 400;
    return next(err);
  }
  if (!title) {
    const err = new Error("Title must be given.");
    err.status = 400;
    return next(err);
  }
  if (!author) {
    const err = new Error("Author must be given.");
    err.status = 400;
    return next(err);
  }
  if (!description) {
    const err = new Error("Description must be given.");
    err.status = 400;
    return next(err);
  }
  if (!genre) {
    const err = new Error("Genre must be given.");
    err.status = 400;
    return next(err);
  }

  try {
    const result = await db.query(
      "UPDATE books SET title = $1, author = $2, description = $3, genre = $4 WHERE id = $5 RETURNING *",
      [title.trim(), author.trim(), description.trim(), genre.trim(), bookId]
    );
    if (result.rowCount === 0) {
      const err = new Error("Book not found.");
      err.status = 404;
      return next(err);
    }
    res
      .status(200)
      .json({ message: "Book updated successfully.", book: result.rows[0] });
  } catch (error) {
    console.error(error);
    const err = new Error("Error updating book.");
    err.status = 500;
    return next(err);
  }
};

// @desc    Delete a book.
// @path    DELETE admin/books/:id
const deleteBook = async (req, res, next) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    const err = new Error("Book id must be given and valid.");
    err.status = 400;
    return next(err);
  }
  try {
    const result = await db.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [bookId]
    );
    if (result.rowCount === 0) {
      const err = new Error("Book not found.");
      err.status = 404;
      return next(err);
    }
    res
      .status(200)
      .json({ message: "Book deleted successfully.", book: result.rows[0] });
  } catch (error) {
    console.error(error);
    const err = new Error("Error deleting book.");
    err.status = 500;
    return next(err);
  }
};

const borrowBookForUser = async (req, res, next) => {
  const bookId = parseInt(req.params.id);
  const username = req.body.username;
  if (isNaN(bookId)) {
    const err = new Error("Book id must be given and valid.");
    err.status = 400;
    return next(err);
  }
  if (!username) {
    const err = new Error("Username must be given.");
    err.status = 400;
    return next(err);
  }
  try {
    await db.query("BEGIN");
    const userRes = await db.query("SELECT id FROM users WHERE username = $1", [
      username,
    ]);
    if (userRes.rowCount === 0) {
      await db.query("ROLLBACK");
      const err = new Error("User is not found.");
      err.status = 404;
      return next(err);
    }
    const userId = userRes.rows[0].id;

    const updateRes = await db.query(
      "UPDATE books SET borrower_id = $1 WHERE id = $2 AND borrower_id IS NULL RETURNING *",
      [userId, bookId]
    );
    if (updateRes.rowCount === 0) {
      await db.query("ROLLBACK");
      const err = new Error("Book is not found or already borrowed.");
      err.status = 404;
      return next(err);
    }
    await db.query("INSERT INTO borrows (user_id, book_id) VALUES ($1, $2)", [
      userId,
      bookId,
    ]);
    await db.query("COMMIT"); // End transaction

    res.status(200).json({
      message: "Book borrowed successfully.",
      book: updateRes.rows[0],
    });
  } catch (error) {
    console.error(error);
    await db.query("ROLLBACK");
    const err = new Error("Error borrowing book.");
    err.status = 500;
    return next(err);
  }
};

const returnBookForUser = async (req, res, next) => {
  const bookId = parseInt(req.params.id);
  const userId = parseInt(req.body.id);
  if (isNaN(bookId)) {
    const err = new Error("Book id is not valid.");
    err.status = 400;
    return next(err);
  }
  if (isNaN(userId)) {
    const err = new Error("User id is not valid.");
    err.status = 400;
    return next(err);
  }
  try {
    await db.query("BEGIN");
    const result = await db.query(
      "UPDATE books SET borrower_id = NULL WHERE id = $1 AND borrower_id = $2 RETURNING *",
      [bookId, userId]
    );
    if (result.rowCount === 0) {
      await db.query("ROLLBACK");
      const err = new Error("Book is already not borrowed or not found.");
      err.status = 409;
      return next(err);
    }
    await db.query(
      "UPDATE borrows SET returned_at = NOW() WHERE user_id = $1 AND book_id = $2 AND returned_at IS NULL",
      [userId, bookId]
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

const switchFeaturedBook = async (req, res, next) => {
  const bookdId = parseInt(req.params.id);
  const isFeatured = req.body.is_featured;
  if (isNaN(bookdId)) {
    const err = new Error("Book id not valid.");
    err.status = 400;
    return next(err);
  }
  if (isFeatured == null) {
    const err = new Error("is_featured field must be given.");
    err.status = 400;
    return next(err);
  }
  try {
    const result = await db.query(
      "UPDATE books SET is_featured = $1 WHERE id = $2 RETURNING *",
      [isFeatured, bookdId]
    );
    if (result.rowCount === 0) {
      const err = new Error("Book not found.");
      err.status = 404;
      return next(err);
    }
    res
      .status(200)
      .json({ message: `${isFeatured ? 'Featured Successfully.' : 'Unfeatured Successfully.'}` });
  } catch (error) {
    console.error(error);
    const err = new Error("Error changing featured data.");
    err.status = 500;
    return next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT id, username, email, role, created_at FROM users;"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    const err = new Error("Error getting users data.");
    err.status = 500;
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    const err = new Error("User id is not valid.");
    err.status = 400;
    return next(err);
  }

  try {
    const result = await db.query(
      "SELECT id, username, email, role, created_at FROM users WHERE id = $1",
      [userId]
    );
    if (result.rowCount === 0) {
      const err = new Error("User not found.");
      err.status = 404;
      return next(err);
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    const err = new Error("Error getting user data.");
    err.status = 500;
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  const userId = parseInt(req.params.id);
  const email = req.body.email;
  const role = req.body.role;
  if (isNaN(userId)) {
    const err = new Error("User id is not valid.");
    err.status = 400;
    return next(err);
  }
  if (userId === 1) {
    const err = new Error("User id 1 cannot be altered.");
    err.status = 403;
    return next(err);
  }
  if (!email) {
    const err = new Error("Email should be given.");
    err.status = 400;
    return next(err);
  }
  if (!role) {
    const err = new Error("Role should be given.");
    err.status = 400;
    return next(err);
  }
  if (role !== "user" && role !== "admin") {
    const err = new Error("Role can only be admin or user.");
    err.status = 400;
    return next(err);
  }

  try {
    const result = await db.query(
      "UPDATE users SET email = $1, role = $2 WHERE id = $3 RETURNING id, username, email, role",
      [email, role, userId]
    );
    if (result.rowCount === 0) {
      const err = new Error("User is not found.");
      err.status = 404;
      return next(err);
    }
    res
      .status(200)
      .json({ message: "User updated successfully.", user: result.rows[0] });
  } catch (error) {
    console.error(error);
    const err = new Error("Error updating user.");
    err.status = 500;
    return next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    const err = new Error("User id is not valid.");
    err.status = 400;
    return next(err);
  }
  if (userId === 1) {
    const err = new Error("User id 1 cannot be deleted.");
    err.status = 403;
    return next(err);
  }

  try {
    const result = await db.query(
      "DELETE FROM users WHERE id = $1 RETURNING id, username",
      [userId]
    );
    if (result.rowCount === 0) {
      const err = new Error("User is not found.");
      err.status = 404;
      return next(err);
    }
    res
      .status(200)
      .json({ message: "User is deleted successfully.", user: result.rows[0] });
  } catch (error) {
    console.error(error);
    const err = new Error("Error deleting user data.");
    err.status = 500;
    return next(err);
  }
};

export {
  addNewBook,
  updateBook,
  deleteBook,
  borrowBookForUser,
  returnBookForUser,
  switchFeaturedBook,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

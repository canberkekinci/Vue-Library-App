import express from "express";
import {
  getBooks,
  getBook,
  getBooksAndBookmarks,
  getBookAndBookmark,
  bookmarkBook,
  unBookmarkBook,
  borrowBook,
  returnBook,
  getFeaturedBooks,
  getBooksWithBorrow,
  getBooksWithFeatured,
  getBookWithBorrow,
} from "../controllers/booksControllers.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getBooks); // used
router.get("/with-borrows", getBooksWithBorrow); // used
router.get("/with-featured", getBooksWithFeatured); // used
router.get("/with-bookmarks", auth, getBooksAndBookmarks); // used
router.get("/featured", getFeaturedBooks); // used
router.post("/borrow/:id", auth, borrowBook); // used
router.post("/return/:id", auth, returnBook); // used
router.post("/bookmark/:id", auth, bookmarkBook); // used
router.delete("/unbookmark/:id", auth, unBookmarkBook); // used
router.get("/with-bookmarks/:id", auth, getBookAndBookmark); // used
router.get("/:id", getBook); // used
router.get("/with-borrows/:id", getBookWithBorrow); // used

export default router;

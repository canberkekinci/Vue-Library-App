import express from "express";
import auth from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminOnly.js";
import {
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
} from "../controllers/adminControllers.js";

const router = express.Router();

router.get("/users", auth, adminOnly, getUsers); // used
router.post("/books", auth, adminOnly, addNewBook); // used
router.get("/users/:id", auth, adminOnly, getUser); // used
router.put("/users/:id", auth, adminOnly, updateUser); // used
router.delete("/users/:id", auth, adminOnly, deleteUser); // used
router.put("/books/:id", auth, adminOnly, updateBook); // used
router.delete("/books/:id", auth, adminOnly, deleteBook); // used
router.put("/borrow/:id", auth, adminOnly, borrowBookForUser); // used
router.put("/return/:id", auth, adminOnly, returnBookForUser); // used
router.put("/switch-featured/:id", auth, adminOnly, switchFeaturedBook); // used

export default router;

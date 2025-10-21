import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from 'cookie-parser';
import "./tokenCleanup.js";
import booksRoutes from "./routes/booksRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/books", booksRoutes);
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
  const error = new Error("Could not find the path.");
  error.status = 404;
  next(error);
});

// handling errors
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});

import bcrypt from "bcrypt";
import db from "../db.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    // look for username and email
    const existingUser = await db.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (existingUser.rows.length > 0) {
      const error = new Error("Username or Email already exists.");
      error.status = 409;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    const err = new Error("Error creating user.");
    err.status = 500;
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const response = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (response.rows.length === 0) {
      const err = new Error("User is not found.");
      err.status = 404;
      return next(err);
    }

    const user = response.rows[0];
    const authResult = await bcrypt.compare(password, user.password_hash);
    if (authResult) {
      const accessToken = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      // Next time just give user id inside of the refresh token.
      const refreshToken = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      await db.query(
        "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')",
        [user.id, refreshToken]
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 Days
      });
      res.status(200).json({
        message: "Logged in successfully.",
        accessToken: accessToken,
      });
    } else {
      const err = new Error("Incorrect password.");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    const err = new Error("Error logging in.");
    err.status = 500;
    next(err);
  }
};

const refreshUser = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    const error = new Error("You're not logged in. Please log in to continue.");
    error.status = 401;
    return next(error);
  }
  try {
    const includes = await db.query(
      "SELECT * FROM refresh_tokens WHERE token = $1",
      [refreshToken]
    );
    if (includes.rows.length === 0) {
      const error = new Error(
        "Your session is invalid or has been revoked. Please log in again."
      );
      error.status = 403;
      return next(error);
    }
    // next time take the user infos from the database using user id inside the refresh token.
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        const error = new Error(
          "Your session has expired, please log in again."
        );
        error.status = 403;
        return next(error);
      }
      const accessToken = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.status(200).json({ accessToken: accessToken });
    });
  } catch (error) {
    const err = new Error("Error refreshing user.");
    err.status = 500;
    next(err);
  }
};

const logoutUser = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    const error = new Error("You are not logged in.");
    error.status = 401;
    return next(error);
  }
  try {
    const includes = await db.query(
      "SELECT * FROM refresh_tokens WHERE token = ($1)",
      [refreshToken]
    );
    if (includes.rows.length === 0) {
      const error = new Error("Your session is already invalid or expired.");
      error.status = 404;
      return next(error);
    }
    await db.query("DELETE FROM refresh_tokens WHERE token = ($1)", [
      refreshToken,
    ]);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
    });
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    const err = new Error("Error logging out.");
    err.status = 500;
    next(err);
  }
};

export { registerUser, loginUser, refreshUser, logoutUser };

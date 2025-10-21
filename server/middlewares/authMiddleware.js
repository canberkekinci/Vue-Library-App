import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    const error = new Error("You need to login.");
    error.status = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      const error = new Error("Token is not valid.");
      error.status = 403;
      return next(error);
    }
    req.user = user;
    next();
  });
};

export default auth;

const adminOnly = (req, res, next) => {
  // is req.user available?
  if (!req.user) {
    const error = new Error("Unauthorized.");
    error.status = 401;
    return next(error);
  }

  // role control
  if (req.user.role !== "admin") {
    const error = new Error("Access denied, admins only.");
    error.status = 403;
    return next(error);
  }

  next();
};

export default adminOnly;

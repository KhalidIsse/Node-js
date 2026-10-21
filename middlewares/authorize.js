// authorize: allows only the listed roles (must run after protect)
const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res
      .status(403)
      .json({ message: `Access denied: Requires one of [${roles.join(', ')}]` });
  }
  next();
};

module.exports = authorize;

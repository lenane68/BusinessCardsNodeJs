export const adminMiddleware = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

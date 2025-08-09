export const businessMiddleware = (req, res, next) => {
  if (!req.user?.isBusiness) {
    return res.status(403).json({ error: 'Access denied. Business users only.' });
  }
  next();
};

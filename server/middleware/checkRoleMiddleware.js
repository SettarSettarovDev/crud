const jwt = require('jsonwebtoken');

module.exports = function (role) {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Not autorized' });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.userRole !== role) {
        return res.status(403).json({ message: 'No access' });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: 'Not autorized' });
    }
  };
};

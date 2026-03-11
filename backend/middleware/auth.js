const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const tokenParts = token.split(' ');
    const tokenVal = tokenParts[0] === 'Bearer' ? tokenParts[1] : tokenParts[0];
    
    const decoded = jwt.verify(tokenVal, process.env.JWT_SECRET || 'yoursupersecretjwtkey');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

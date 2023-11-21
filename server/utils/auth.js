//create a middleware to handle authentication using the JWT token
const jwt = require('jsonwebtoken');
const secret = "mysecretsshhhhh";
//corrected version for the asynchronous verification
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = await jwt.verify(token, secret);
    req.user = decodedToken;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateUser;
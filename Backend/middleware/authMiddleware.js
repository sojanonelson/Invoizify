const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { createNotification } = require('../controllers/notificationController');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Log the decoded user ID
      console.log('User ID from token:', decoded.id);

      // Fetch user details from the database
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User not found. Invalid token.' });
      }
      await createNotification(decoded.id, 'security_alert', {
        message: 'Unauthorized access attempt detected'
      });
      next();
    } catch (error) {
      console.error('Token verification error:', error); // For debugging
      res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
    }
  } else {
    res.status(401).json({ message: 'Authorization token is missing' });
  }
};

module.exports = { protect };

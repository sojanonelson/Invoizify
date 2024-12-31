const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkUserRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Check if Authorization header exists
      const authHeader = req.header('Authorization');
      if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }

      // Validate Bearer token format
      if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. Invalid token format.' });
      }

      // Extract the token
      const token = authHeader.split(' ')[1];
      
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user and check if they still exist
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Check if user role is allowed
      if (allowedRoles && allowedRoles.length > 0) {
        if (!allowedRoles.includes(user.role)) {
          return res.status(403).json({ 
            message: 'Access denied. Insufficient permissions.' 
          });
        }
      }

      // Add user to request object for use in protected routes
      req.user = {
        id: user._id,
        email: user.email,
        role: user.role
      };

      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token.' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired.' });
      }
      
      console.error('Authorization error:', error);
      return res.status(500).json({ message: 'Server error during authorization.' });
    }
  };
};

module.exports = checkUserRole;
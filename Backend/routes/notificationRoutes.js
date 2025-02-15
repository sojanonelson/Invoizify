// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const {
  getUserNotifications,
  markAsRead,
  getAdminNotifications
} = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');
const checkUserRole = require('../middleware/checkUserRole');

// User routes
router.get('/user', protect, getUserNotifications);
router.put('/:id/read', protect, markAsRead);

// Admin routes
router.get('/admin', protect, checkUserRole(['admin']), getAdminNotifications);

module.exports = router;

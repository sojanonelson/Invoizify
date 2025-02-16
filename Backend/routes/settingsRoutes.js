const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getThemeSettings,
  updateThemeSettings,
  getPaymentMethods,
  addPaymentMethod,
  deletePaymentMethod,
  getNotificationSettings,
  updateNotificationSettings
} = require('../controllers/settingsController');

// Theme Settings
router.route('/theme')
  .get(protect, getThemeSettings)
  .post(protect, updateThemeSettings);

// Payment Methods
router.route('/payment-methods')
  .get(protect, getPaymentMethods)
  .post(protect, addPaymentMethod);

router.route('/payment-methods/:id')
  .delete(protect, deletePaymentMethod);

// Notification Settings
router.route('/notifications')
  .get(protect, getNotificationSettings)
  .post(protect, updateNotificationSettings);

module.exports = router;
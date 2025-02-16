// controllers/notificationController.js
const Notification = require('../models/Notification');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

// Create notification
const createNotification = async (userId, type, data) => {
  try {
    const notificationData = {
      user: userId,
      message: data.message,
      type,
      read: false
    };

    if (data.invoiceId) notificationData.relatedInvoice = data.invoiceId;
    if (data.subscriptionId) notificationData.relatedSubscription = data.subscriptionId;
    if (data.paymentLink) notificationData.paymentLink = data.paymentLink;
    if (data.metadata) notificationData.metadata = data.metadata;

    const notification = new Notification(notificationData);
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};

// Create admin notification
const createAdminNotification = async (message, type, data) => {
  try {
    const notification = new Notification({
      admin: true,
      message,
      type,
      read: false,
      ...data
    });
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error creating admin notification:', error);
    return null;
  }
};

// Get user notifications
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id,
      read: false
    }).sort('-createdAt');
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get admin notifications
const getAdminNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      admin: true,
      read: false
    }).sort('-createdAt');
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createNotification,
  createAdminNotification,
  getUserNotifications,
  markAsRead,
  getAdminNotifications
};
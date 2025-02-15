// models/Notification.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  admin: { type: Boolean, default: false },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: [
      'invoice',
      'payment_reminder',
      'subscription_expiry',
      'payment_link',
      'security_alert',
      'system_update',
      'failed_payment',
      'admin_subscription_expiry'
    ],
    required: true
  },
  relatedInvoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  relatedSubscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  paymentLink: String,
  read: { type: Boolean, default: false },
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
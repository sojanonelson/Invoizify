const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  theme: {
    mode: { 
      type: String, 
      enum: ['light', 'dark', 'system'], 
      default: 'light' 
    },
    primaryColor: { 
      type: String, 
      default: '#4F46E5' 
    },
    accentColor: { 
      type: String, 
      default: '#6366F1' 
    }
  },
  paymentMethods: [{
    provider: {
      type: String,
      enum: ['stripe', 'razorpay', 'paypal'],
      required: true
    },
    methodId: String,
    cardLast4: String,
    fingerprint: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  notifications: {
    email: {
      invoices: { type: Boolean, default: true },
      payments: { type: Boolean, default: true },
      promotions: { type: Boolean, default: true }
    },
    push: {
      invoices: { type: Boolean, default: true },
      payments: { type: Boolean, default: true }
    },
    sms: {
      paymentReminders: { type: Boolean, default: true }
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
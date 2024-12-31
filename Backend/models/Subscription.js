const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  plan: { type: String, required: true, enum: ['Basic', 'Standard', 'Premium'] },
  features: [String],
  createdDate: { type: Date, required: true, default: Date.now },  // Created date
  expireDate: { type: Date, required: true },  // Expiry date
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);

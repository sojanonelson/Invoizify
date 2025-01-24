const mongoose = require('mongoose');

const PartySchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  ownerName: { type: String, required: true },
  gstNumber: { type: String, required: true },
  fssaiCode: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  drugLicence: { type: String, required: true },
  partyType: { type: String, enum: ['wholesaler', 'retailer'], required: true },
  creditPeriod: { type: Number, required: true },
  creditLimit: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Party', PartySchema);

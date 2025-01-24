const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  shopName: { type: String,},
  gstNumber: { type: String, },
  drugLicenseNumber: { type: String,  },
  fssaiCode: { type: String,  },
  password: { type: String, required: true },
  role: { type: String, enum: ['wholesaler', 'retailer','admin'], required: true },
  profilePicture: { type: String, required: false },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

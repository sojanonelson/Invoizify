const mongoose = require('mongoose');

const InvoiceTemplateSchema = new mongoose.Schema({
  templateName: { type: String, required: true },
  coverImages: [{ type: String }],
  description: { type: String },
  templateDesign: { type: String, required: true }, // Cloudinary URL
  status: { type: String, enum: ['free', 'standard', 'paid'], default: 'free' },
  rating: { type: Number, min: 1, max: 5 },
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('InvoiceTemplate', InvoiceTemplateSchema);
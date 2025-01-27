const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true }, // Unique invoice number
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User (creator)
  items: [
    {
      name: { type: String, required: true }, // Item name
      quantity: { type: Number, required: true }, // Item quantity
      price: { type: Number, required: true }, // Item price
      total: { type: Number, required: true }, // Total for this item (quantity * price)
    },
  ],
  totalAmount: { type: Number, required: true }, // Total amount of the invoice
  tax: { type: Number, default: 0 }, // Tax amount
  discount: { type: Number, default: 0 }, // Discount amount
  grandTotal: { type: Number, required: true }, // Grand total (totalAmount + tax - discount)
  coverImages: [{ type: String }], // Array of cover image URLs
  template: { type: String }, // Reference to the invoice template
  description: { type: String }, // Invoice description
  status: { type: String, enum: ['Pending', 'Paid', 'Cancelled'], default: 'Pending' }, // Invoice status
  createdAt: { type: Date, default: Date.now }, // Invoice creation date
  updatedAt: { type: Date, default: Date.now }, // Invoice last update date
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
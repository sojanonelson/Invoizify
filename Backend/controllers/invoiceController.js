const Invoice = require('../models/Invoice');
const User = require('../models/User');
const { cloudinary, upload } = require('../utils/cloudinary');

// Create a new invoice
const createInvoice = async (req, res) => {
  const {
    user,
    items,
    totalAmount,
    tax,
    discount,
    grandTotal,
    coverImages,
    template,
    description,
  } = req.body;

  try {
    // Validate input
    if (!user || !items || !totalAmount || !grandTotal) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Check if user exists
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique invoice number
    const invoiceNumber = `INV-${Date.now()}`;

    // Create the invoice
    const invoice = new Invoice({
      invoiceNumber,
      user,
      createdBy: req.user.id,
      items,
      totalAmount,
      tax,
      discount,
      grandTotal,
      coverImages,
      template,
      description,
    });

    await invoice.save();

    res.status(201).json({
      message: 'Invoice created successfully',
      invoice,
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get invoice by ID
const getInvoiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findById(id)
      .populate('user')
      .populate('createdBy');

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get invoices by user ID
const getInvoicesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const invoices = await Invoice.find({ user: userId })
      .populate('user')
      .populate('createdBy');

    if (!invoices.length) {
      return res.status(404).json({ message: 'No invoices found for this user' });
    }

    res.status(200).json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Upload invoice template
const uploadInvoiceTemplate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'invoice_templates',
    });

    res.status(201).json({
      message: 'Invoice template uploaded successfully',
      templateUrl: result.secure_url,
    });
  } catch (error) {
    console.error('Error uploading template:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Search invoices
const searchInvoices = async (req, res) => {
  const { user, startDate, endDate, status } = req.query;

  try {
    const query = {};

    if (user) query.user = user;
    if (status) query.status = status;
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const invoices = await Invoice.find(query)
      .populate('user')
      .populate('createdBy');

    res.status(200).json(invoices);
  } catch (error) {
    console.error('Error searching invoices:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update invoice
const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const invoice = await Invoice.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json({
      message: 'Invoice updated successfully',
      invoice,
    });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete invoice
const deleteInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findByIdAndDelete(id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createInvoice,
  getInvoiceById,
  getInvoicesByUserId,
  uploadInvoiceTemplate,
  searchInvoices,
  updateInvoice,
  deleteInvoice,
  upload,
};
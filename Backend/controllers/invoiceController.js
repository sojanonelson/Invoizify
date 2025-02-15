const Invoice = require('../models/Invoice');
const InvoiceTemplate = require('../models/InvoiceTemplate');
const { s3, upload } = require('../utils/s3Upload'); // S3 configuration
const { protect, checkUserRole } = require('../middleware/authMiddleware');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { createNotification } = require('./notificationController');
// Get All Invoice Count (Admin)
const getInvoiceCount = async (req, res) => {
  try {
    const count = await Invoice.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching invoice count:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Most Used Template (Admin)
const getMostUsedTemplate = async (req, res) => {
  try {
    const result = await Invoice.aggregate([
      { $group: { _id: '$template', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    res.status(200).json(result[0] || {});
  } catch (error) {
    console.error('Error fetching most used template:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get All Invoices by User ID
const getInvoicesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const invoices = await Invoice.find({ user: userId }).populate('user').populate('createdBy');
    res.status(200).json(invoices);
  } catch (error) {
    console.error('Error fetching invoices by user:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Invoice by Invoice ID
const getInvoiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await Invoice.findById(id).populate('user').populate('createdBy');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json(invoice);
  } catch (error) {
    console.error('Error fetching invoice by ID:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create Invoice
const createInvoice = async (req, res) => {
  const { user, items, totalAmount, tax, discount, grandTotal, coverImages, template, description } = req.body;
  try {
    const invoiceNumber = `INV-${Date.now()}`;
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
    await createNotification(user, 'invoice', {
      message: `New invoice created: ${invoiceNumber}`,
      invoiceId: invoice._id,
      paymentLink: `https://yourapp.com/pay/${invoiceNumber}`
    });
    res.status(201).json({ message: 'Invoice created successfully', invoice });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update Payment Status
const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const invoice = await Invoice.findByIdAndUpdate(id, { status }, { new: true });
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json({ message: 'Payment status updated successfully', invoice });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete Invoice
const deleteInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await Invoice.findByIdAndDelete(id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const uploadTemplate = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Upload to S3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `templates/${Date.now()}_${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read',
    };

    const command = new PutObjectCommand(params);
    const result = await s3.send(command);

    // Save template details in the database
    const template = new InvoiceTemplate({
      templateName: req.body.templateName,
      coverImages: req.body.coverImages,
      description: req.body.description,
      templateDesign: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`, // S3 URL
      status: req.body.status,
    });
    await template.save();

    res.status(201).json({ message: 'Template uploaded successfully', template });
  } catch (error) {
    console.error('Error uploading template:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Template by ID (Admin)
const getTemplateById = async (req, res) => {
  const { id } = req.params;
  try {
    const template = await InvoiceTemplate.findById(id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.status(200).json(template);
  } catch (error) {
    console.error('Error fetching template by ID:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update Template Details (Admin)
const updateTemplate = async (req, res) => {
  const { id } = req.params;
  const { templateName, coverImages, description, status } = req.body;
  try {
    const template = await InvoiceTemplate.findByIdAndUpdate(
      id,
      { templateName, coverImages, description, status },
      { new: true }
    );
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.status(200).json({ message: 'Template updated successfully', template });
  } catch (error) {
    console.error('Error updating template:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get All Available Templates (User)
const getAllTemplates = async (req, res) => {
  try {
    const templates = await InvoiceTemplate.find({}, { templateDesign: 0 });
    res.status(200).json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update Template Rating (User)
const updateTemplateRating = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  try {
    const template = await InvoiceTemplate.findByIdAndUpdate(id, { rating }, { new: true });
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.status(200).json({ message: 'Rating updated successfully', template });
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getInvoiceCount,
  getMostUsedTemplate,
  getInvoicesByUserId,
  getInvoiceById,
  createInvoice,
  updatePaymentStatus,
  deleteInvoice,
  uploadTemplate,
  getTemplateById,
  updateTemplate,
  getAllTemplates,
  updateTemplateRating,
};
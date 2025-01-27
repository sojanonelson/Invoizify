const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getInvoiceById,
  getInvoicesByUserId,
  uploadInvoiceTemplate,
  searchInvoices,
  updateInvoice,
  deleteInvoice,
  upload,
} = require('../controllers/invoiceController');
const { protect } = require('../middleware/authMiddleware');

// Invoice Template Routes
router.post('/template/upload', protect, upload.single('file'), uploadInvoiceTemplate);

// Invoice Creation Routes
router.post('/create', protect, createInvoice);
router.get('/:id', protect, getInvoiceById);
router.get('/user/:userId', protect, getInvoicesByUserId);

// Invoice Controllers Routes
router.get('/search', protect, searchInvoices);
router.put('/:id', protect, updateInvoice);
router.delete('/:id', protect, deleteInvoice);

module.exports = router;
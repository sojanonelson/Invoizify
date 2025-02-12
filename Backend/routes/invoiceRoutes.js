const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/invoiceController');
const { protect } = require('../middleware/authMiddleware');
const {upload} = require('../utils/s3Upload'); // S3 upload middleware
const checkUserRole = require('../middleware/checkUserRole');

// Invoice Routes
router.get('/count', protect, checkUserRole(['admin']), getInvoiceCount);
router.get('/most-used-template', protect, checkUserRole(['admin']), getMostUsedTemplate);
router.get('/user/:userId', protect, getInvoicesByUserId);
router.get('/:id', protect, getInvoiceById);
router.post('/', protect, createInvoice);
router.put('/:id/status', protect, updatePaymentStatus);
router.delete('/:id', protect, deleteInvoice);

// Template Routes
router.post('/template/upload', protect, checkUserRole(['admin']), upload.single('file'), uploadTemplate);
router.get('/template/:id', protect, checkUserRole(['admin']), getTemplateById);
router.put('/template/:id', protect, checkUserRole(['admin']), updateTemplate);
router.get('/templates', protect, getAllTemplates);
router.put('/template/:id/rating', protect, updateTemplateRating);

module.exports = router;
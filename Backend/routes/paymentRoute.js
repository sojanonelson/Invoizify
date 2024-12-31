// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route for creating an order
router.post('/create-order', paymentController.createOrder);

// Route for verifying payment
router.post('/verify-payment', paymentController.verifyPayment);

module.exports = router;

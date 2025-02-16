// controllers/paymentController.js
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { createNotification } = require('./notificationController');

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_LMvbPjBxhpGAco', // Replace with Razorpay Key ID
    key_secret: 'UbSDOP0gZxqLpSm1NEYNkrVY', // Replace with Razorpay Key Secret
});

// Controller for creating an order
const createOrder = async (req, res) => {
    const { amount, currency } = req.body;

    const options = {
        amount: amount * 100, // Amount in smallest currency unit (paise)
        currency: currency,
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Error creating order');
    }
};

// Controller for verifying payment signature
const verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    const generatedSignature = crypto
        .createHmac('sha256', 'i4NIfDEGIC9b9xE9BhlAtobc') // Replace with Razorpay Key Secret
        .update(`${order_id}|${payment_id}`)
        .digest('hex');
    
    if (generatedSignature === signature) {
        res.json({ success: true });
    } else {
        await createNotification(req.user.id, 'failed_payment', {
            message: 'Payment failed due to invalid signature'
        });
        res.status(400).json({ success: false, message: 'Invalid signature' });
    }
};

// Export the controllers
module.exports = {
    createOrder,
    verifyPayment,
};

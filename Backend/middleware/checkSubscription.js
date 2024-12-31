const User = require('../models/User');
const Subscription = require('../models/Subscription');

const checkSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;  // Assuming user ID is available in the request
    const user = await User.findById(userId).populate('subscription');

    if (!user.subscription) {
      return res.status(403).json({ message: 'No active subscription' });
    }

    const currentDate = new Date();
    const expiryDate = new Date(user.subscription.updatedAt);
    expiryDate.setDate(expiryDate.getDate() + user.subscription.duration);

    if (currentDate > expiryDate) {
      return res.status(403).json({ message: 'Subscription has expired' });
    }

    req.subscription = user.subscription;  // Pass subscription details to the next middleware or controller
    next();
  } catch (error) {
    console.error('Error checking subscription:', error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};

module.exports = checkSubscription;

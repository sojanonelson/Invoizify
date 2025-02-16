const User = require('../models/User');
const Subscription = require('../models/Subscription');
const { createNotification, createAdminNotification } = require('./notificationController');

// Create a new subscription
const createSubscription = async (req, res) => {
    const { userId, plan } = req.body;
  
    try {
      // Find the user
      const user = await User.findById(userId);
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Define durations for each plan
      const durations = {
        Basic: 30,
        Standard: 90,
        Premium: 180
      };
  
      const features = {
        Basic: ['Feature 1', 'Feature 2'],
        Standard: ['Feature 1', 'Feature 2', 'Feature 3'],
        Premium: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
      };
  
      const duration = durations[plan];
      const featureSet = features[plan];
  
      // Calculate expiration date
      const createdDate = new Date();
      const expireDate = new Date();
      expireDate.setDate(createdDate.getDate() + duration);
  
      const subscription = new Subscription({
        plan,
        createdDate,
        expireDate,
        features: featureSet,
      });
  
      await subscription.save();
  
      user.subscription = subscription;
      await user.save();
      const daysBeforeExpiry = 3; // Send reminder 3 days before
      const reminderDate = new Date(expireDate);
      reminderDate.setDate(remireDate.getDate() - daysBeforeExpiry);
      
      await createNotification(userId, 'subscription_expiry', {
        message: `Your subscription expires in ${daysBeforeExpiry} days`,
        subscriptionId: subscription._id
      });
      
      // When subscription expires
      await createAdminNotification(
        `User ${userId}'s subscription has expired`,
        'admin_subscription_expiry',
        { userId, subscriptionId: subscription._id }
      );
      res.status(201).json({
        message: 'Subscription created successfully',
        subscription: {
          id: subscription._id,
          plan: subscription.plan,
          createdDate: subscription.createdDate,
          expireDate: subscription.expireDate,
          features: subscription.features,
        },
      });
    } catch (error) {
      console.error('Error creating subscription:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
// Get subscription by user ID
const getSubscriptionByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log(userId)
  

  try {
    // Find the user and populate subscription
    const user = await User.findById(userId).populate('subscription')
    console.log('User with subscription:', user);

    if (!user || !user.subscription) {
      return res.status(404).json({ message: 'Subscription not found for this user' });
    }

    res.status(200).json({
      userId: user.id,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


const deleteSubscription = async (req, res) => {
    const { subscriptionId } = req.params;
  
    try {
      // Find and delete the subscription
      const subscription = await Subscription.findByIdAndDelete(subscriptionId);
  
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
  
      res.status(200).json({ message: 'Subscription deleted successfully' });
    } catch (error) {
      console.error('Error deleting subscription:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };

  const getAllSubscriptions = async (req, res) => {
    try {
      // Check if the user is an admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      // Retrieve and count subscriptions by planType
      const subscriptionsCount = await Subscription.aggregate([
        {
          $group: {
            _id: "$plan",
            count: { $sum: 1 }
          }
        },
        {
          $match: {
            _id: { $in: ['Basic', 'Premium'] }  // Filter only for basic and premium
          }
        }
      ]);
  
      res.status(200).json(subscriptionsCount);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ message: 'Server error', error });
    }
};



  

module.exports = { createSubscription, getSubscriptionByUserId ,deleteSubscription , getAllSubscriptions};

const Settings = require('../models/Settings');

// Theme Settings
const getThemeSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne({ user: req.user.id });
    
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    res.json({
      mode: settings.theme.mode,
      primaryColor: settings.theme.primaryColor,
      accentColor: settings.theme.accentColor
    });
  } catch (error) {
    console.error('Error fetching theme settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateThemeSettings = async (req, res) => {
  try {
    const { mode, primaryColor, accentColor } = req.body;
    
    const settings = await Settings.findOneAndUpdate(
      { user: req.user.id },
      { 
        $set: { 
          'theme.mode': mode,
          'theme.primaryColor': primaryColor,
          'theme.accentColor': accentColor
        }
      },
      { new: true, upsert: true }
    );

    res.json({
      mode: settings.theme.mode,
      primaryColor: settings.theme.primaryColor,
      accentColor: settings.theme.accentColor
    });
  } catch (error) {
    console.error('Error updating theme settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Payment Methods
const getPaymentMethods = async (req, res) => {
  try {
    const settings = await Settings.findOne({ user: req.user.id });
    
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    res.json(settings.paymentMethods.map(method => ({
      id: method._id,
      provider: method.provider,
      last4: method.cardLast4,
      isDefault: method.isDefault
    })));
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addPaymentMethod = async (req, res) => {
  try {
    const { provider, methodId, cardLast4, fingerprint } = req.body;
    
    const settings = await Settings.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: {
          paymentMethods: {
            provider,
            methodId,
            cardLast4,
            fingerprint,
            isDefault: false
          }
        }
      },
      { new: true, upsert: true }
    );

    res.status(201).json(settings.paymentMethods.slice(-1)[0]);
  } catch (error) {
    console.error('Error adding payment method:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const settings = await Settings.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { paymentMethods: { _id: id } } },
      { new: true }
    );

    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    res.json({ message: 'Payment method deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment method:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Notification Settings
const getNotificationSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne({ user: req.user.id });
    
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    res.json(settings.notifications);
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateNotificationSettings = async (req, res) => {
  try {
    const updates = req.body;
    
    const settings = await Settings.findOneAndUpdate(
      { user: req.user.id },
      { $set: { notifications: updates } },
      { new: true, upsert: true }
    );

    res.json(settings.notifications);
  } catch (error) {
    console.error('Error updating notification settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getThemeSettings,
  updateThemeSettings,
  getPaymentMethods,
  addPaymentMethod,
  deletePaymentMethod,
  getNotificationSettings,
  updateNotificationSettings
};
const User = require('../models/User');

const getProfilePicture = async (req, res) => {
  
  const { id } = req.params;

  try {
    // Await the asynchronous operation
    const user = await User.findById(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    res.status(200).json({
      profile: user.profilePicture,
    });
  } catch (err) {
    // Log the error and send a response
    console.error(err);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};


module.exports = {
  getProfilePicture,
  
};

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register User
const registerUser = async (req, res) => {
  const { name, phone, email, shopName, gstNumber, drugLicenseNumber, fssaiCode, role, password, profilePicture } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Hash password with bcrypt's salt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      email,
      shopName,
      gstNumber,
      drugLicenseNumber,
      fssaiCode,
      role,
      profilePicture,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
console.log(email,password)
  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.status(200).json({
        userdata: {
          _id: user.id,
          name: user.name,
          email: user.email,
          profile: user.profilePicture,
          role: user.role,
          token: generateToken(user.id),
          
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};


// Delete User Controller
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error during user deletion:', error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};

// Get User Controller
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove sensitive information before sending response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    console.error('Error during user retrieval:', error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};

// Update User Controller
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, phone, shopName, gstNumber, drugLicenseNumber, fssaiCode, role, profilePicture } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.shopName = shopName || user.shopName;
    user.gstNumber = gstNumber || user.gstNumber;
    user.drugLicenseNumber = drugLicenseNumber || user.drugLicenseNumber;
    user.fssaiCode = fssaiCode || user.fssaiCode;
    user.role = role || user.role;
    user.profilePicture = profilePicture || user.profilePicture;

    await user.save();

    // Remove sensitive information before sending response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: 'User updated successfully',
      user: userResponse,
    });
  } catch (error) {
    console.error('Error during user update:', error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser, getUser };
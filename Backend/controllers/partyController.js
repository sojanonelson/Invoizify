const Party = require('../models/Party');

// Create Party Controller
const createParty = async (req, res) => {
  const {
    shopName,
    ownerName,
    gstNumber,
    fssaiCode,
    phone,
    email,
    drugLicence,
    partyType,
    creditPeriod,
    creditLimit,
  } = req.body;
  
 

  console.log("Received Data:", shopName, fssaiCode);
  

  // Validate input
  if (
    !shopName || !ownerName || !gstNumber || !fssaiCode || !phone || 
    !email || !drugLicence || !partyType || !creditPeriod || !creditLimit
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized: User information is missing' });
  }

  try {
    // Check if the party already exists
    const partyExists = await Party.findOne({ phone });
    if (partyExists) {
      return res.status(400).json({ message: 'Party already exists with this phone number' });
    }

    // Create the party
    const party = new Party({
      shopName,
      ownerName,
      gstNumber,
      fssaiCode,
      phone,
      email,
      drugLicence,
      partyType,
      creditPeriod: parseInt(creditPeriod, 10),
      creditLimit: parseInt(creditLimit, 10),
      createdBy: req.user.id,
    });

    await party.save();

    res.status(201).json({
      message: 'Party created successfully',
      party,
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Update Party Controller
const updateParty = async (req, res) => {
    const { id } = req.params;
    const {
      shopName,
      ownerName,
      gstNumber,
      fssaiCode,
      phone,
      email,
      drugLicence,
      partyType,
      creditPeriod,
      creditLimit,
    } = req.body;
  
    try {
      const party = await Party.findById(id);
  
      if (!party) {
        return res.status(404).json({ message: 'Party not found' });
      }
  
      // Update fields
      party.shopName = shopName || party.shopName;
      party.ownerName = ownerName || party.ownerName;
      party.gstNumber = gstNumber || party.gstNumber;
      party.fssaiCode = fssaiCode || party.fssaiCode;
      party.phone = phone || party.phone;
      party.email = email || party.email;
      party.drugLicence = drugLicence || party.drugLicence;
      party.partyType = partyType || party.partyType;
      party.creditPeriod = creditPeriod || party.creditPeriod;
      party.creditLimit = creditLimit || party.creditLimit;
  
      await party.save();
  
      res.status(200).json({
        message: 'Party updated successfully',
        // party,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

// Delete Party Controller
const deleteParty = async (req, res) => {
    const { id } = req.params;
  
    try {
    const party = await Party.findByIdAndDelete(id);
  
      if (!party) {
        return res.status(404).json({ message: 'Party not found' });
      }
  
  
      res.status(200).json({ message: 'Party deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
const getParty = async(req,res) => {

    const { id} = req.params;

    try {
          const party = await Party.findById(id);
      
          if (!party) {
            return res.status(404).json({ message: 'Party not found' });
          }
      
          res.status(200).json(party);

    }catch(err){
        console.log(err)
    }
}

const getAllPartiesByUser = async (req, res) => {
  const { id } = req.params; 
  console.log("hhe", id)

  try {
    // Find all parties where the `createdBy` field matches the provided userId
    const parties = await Party.find({ createdBy: id });

    // Check if there are no parties found
    if (!parties.length) {
      return res.status(404).json({ message: 'No parties found for this user' });
    }

    // Respond with the list of parties
    res.status(200).json(parties);
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: 'Server error', error });
  }
};

  
  

module.exports = { createParty ,updateParty, deleteParty , getParty,getAllPartiesByUser};

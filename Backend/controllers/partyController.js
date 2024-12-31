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

  // Validate input
  if (!shopName || !ownerName || !gstNumber || !fssaiCode || !phone || !email || !drugLicence || !partyType || !creditPeriod || !creditLimit) {
    return res.status(400).json({ message: 'All fields are required' });
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
      creditPeriod,
      creditLimit,
    });

    await party.save();

    res.status(201).json({
      message: 'Party created successfully',
      party,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
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
  
  

module.exports = { createParty ,updateParty, deleteParty , getParty};

const express = require('express');
const router = express.Router();
const Party = require('../models/Party');
const {createParty , deleteParty, updateParty, getParty, getAllPartiesByUser} = require('../controllers/partyController');
const { protect } = require('../middleware/authMiddleware');

// Create Party
router.post('/create', protect, createParty)
router.put('/update/:id', protect, updateParty)
router.delete('/delete/:id', protect, deleteParty )
router.get('/:id',protect, getParty)
router.get('/list/user/:id', getAllPartiesByUser)


module.exports = router;

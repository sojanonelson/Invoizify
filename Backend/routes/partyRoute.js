const express = require('express');
const router = express.Router();
const Party = require('../models/Party');
const {createParty , deleteParty, updateParty, getParty} = require('../controllers/partyController')

// Create Party
router.post('/create', createParty)
router.put('/update/:id', updateParty)
router.delete('/delete/:id', deleteParty )
router.get('/:id', getParty)


module.exports = router;

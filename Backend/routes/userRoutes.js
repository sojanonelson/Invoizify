const express = require('express');
const { registerUser, loginUser ,getUser, updateUser, deleteUser } = require('../controllers/userControllers');
const {getProfilePicture} = require('../controllers/generalController');
const { getAllPartiesByUser } = require('../controllers/partyController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.put('/update/:id', updateUser);
router.get('/:id', getUser)
router.get('/profile/:id', getProfilePicture)
router.delete('/delete/:id', deleteUser);

module.exports = router;

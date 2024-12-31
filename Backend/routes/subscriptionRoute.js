const express = require('express');
const router = express.Router();
const { createSubscription , getSubscriptionByUserId , deleteSubscription , getAllSubscriptions } = require('../controllers/subscriptionController');
const checkUserRole = require('../middleware/checkUserRole')


router.get('/admin/subscriptions',checkUserRole(['admin']), getAllSubscriptions);
router.post('/create', createSubscription);
router.get('/:userId', getSubscriptionByUserId )
router.delete('/:subscriptionId' , deleteSubscription )

module.exports = router;

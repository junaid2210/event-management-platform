const express = require('express');
const router = express.Router();

const { registerForEvent, getMyRegistration, cancelRegistration } = require('../controllers/registration.controller.js');
const { protect } = require('../middleware/auth.js');
const { isStudent } = require('../middleware/role.js');

// register for event
router.post('/events/:id/register', protect, isStudent, registerForEvent);

//view my registration
router.get('/users/me/registrations', protect, isStudent, getMyRegistration);

//cancel registration
router.delete('/events/:id/register',protect,isStudent,cancelRegistration);

module.exports = router;
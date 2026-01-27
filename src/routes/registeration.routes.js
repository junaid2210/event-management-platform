const express = require('express');
const router = express.Router();

const { registerForEvent, getMyRegisteration } = require('../controllers/registeration.controller.js');
const { protect } = require('../middleware/auth');
const { isStudent } = require('../middleware/role');

// register for event
router.post('/events/:id/register', protect, isStudent, registerForEvent);

//view my registeration
router.get('/users/me/registerations', protect, isStudent, getMyRegisteration);

module.exports = router;
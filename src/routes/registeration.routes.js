const express = require('express');
const router = express.Router();

const { registerForEvent, getMyRegisteration, cancelRegisteration } = require('../controllers/registeration.controller.js');
const { protect } = require('../middleware/auth');
const { isStudent } = require('../middleware/role');

// register for event
router.post('/events/:id/register', protect, isStudent, registerForEvent);

//view my registeration
router.get('/users/me/registerations', protect, isStudent, getMyRegisteration);

//cancel registeration
router.delete('/events/:id/register',protect,isStudent,cancelRegisteration);

module.exports = router;
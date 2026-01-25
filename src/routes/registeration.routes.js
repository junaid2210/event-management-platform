const express = require('express');
const router = express.Router();

const { registerForEvent } = require('../controllers/registeration.controller.js');
const { protect } = require('../middleware/auth');
const { isStudent } = require('../middleware/role');

router.post('/events/:id/register', protect, isStudent, registerForEvent);

module.exports = router;
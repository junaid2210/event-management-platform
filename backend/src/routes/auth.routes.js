const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');
const validate = require('../middleware/validate');

const {register, login, logout, getMe} = require('../controllers/auth.controller');
const { registerSchema, loginSchema } = require('../validations/auth.validation');
const { getAllColleges  } = require('../controllers/college.controller');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout',logout);
router.get('/me', protect, getMe);
router.get('/colleges', getAllColleges);

module.exports = router;
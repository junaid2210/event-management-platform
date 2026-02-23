const express = require('express');
const router = express.Router();

const {createEvent, getEvents} = require('../controllers/event.controller');
const {protect} = require('../middleware/auth');
const {isOrganizer} = require('../middleware/role');
const {getEventRegistration} = require('../controllers/registration.controller.js');

//view events (optional auth)
router.get('/', getEvents);

//create event (organizer only)
router.post('/',protect,isOrganizer,createEvent);

//organizer view registrations
router.get('/:id/registration', protect, isOrganizer, getEventRegistration);

module.exports = router;
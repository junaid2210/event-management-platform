const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');

const {createEvent, getEvents} = require('../controllers/event.controller');
const {protect} = require('../middleware/auth');
const {isOrganizer} = require('../middleware/role');
const {getEventRegistration} = require('../controllers/registration.controller.js');
const {createEventSchema} = require('../validations/event.validation');

//view events (optional auth)
router.get('/',protect, getEvents);

//create event (organizer only)
router.post('/',protect,isOrganizer, validate(createEventSchema), createEvent);

//organizer view registrations
router.get('/:id/registration', protect, isOrganizer, getEventRegistration);

module.exports = router;
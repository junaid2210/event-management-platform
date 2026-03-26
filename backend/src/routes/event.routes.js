const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');

const {createEvent, getEvents, getEventById, getOrganizerEvents} = require('../controllers/event.controller');
const {protect} = require('../middleware/auth');
const {isOrganizer} = require('../middleware/role');
const {getEventRegistration} = require('../controllers/registration.controller.js');
const {createEventSchema} = require('../validations/event.validation');

//view events (optional auth)
router.get('/',protect, getEvents);

//create event (organizer only)
router.post('/',protect,isOrganizer, validate(createEventSchema), createEvent);

router.get('/organizer', protect, isOrganizer, getOrganizerEvents);

//get details of a single event
router.get('/:id', protect, getEventById)

//organizer view registrations
router.get('/:id/registration', protect, isOrganizer, getEventRegistration);

module.exports = router;
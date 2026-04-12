const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const upload = require('../config/cloudinary');

const {createEvent, getEvents, getEventById, getOrganizerEvents, deleteEvent, getEventAttendees, updateEvent, getMyTickets} = require('../controllers/event.controller');
const {protect} = require('../middleware/auth');
const {isOrganizer} = require('../middleware/role');
const {getEventRegistration} = require('../controllers/registration.controller.js');
const {createEventSchema} = require('../validations/event.validation');

//view events (optional auth)
router.get('/',protect, getEvents);

//create event (organizer only)
router.post('/',protect,isOrganizer, upload.single('image'), validate(createEventSchema), createEvent);

router.get('/organizer', protect, isOrganizer, getOrganizerEvents);

//get event tickets
router.get('/my-tickets', protect, getMyTickets);

//get details of a single event
router.get('/:id', protect, getEventById)

//get event attendees
router.get('/:id/attendees', protect, isOrganizer, getEventAttendees);

//update event route
router.put('/:id', protect, isOrganizer, upload.single('image'), updateEvent);

//delete event
router.delete('/:id', protect, isOrganizer, deleteEvent);

//organizer view registrations
router.get('/:id/registration', protect, isOrganizer, getEventRegistration);

module.exports = router;
const express = require('express');
const router = express.Router();

const {createEvent, getEvents} = require('../controllers/event.controller');
const {protect} = require('../middleware/auth');
const {isOrganizer} = require('../middleware/role');
const {getEventRegisteration} = require('../controllers/registeration.controller.js');

//view events (optional auth)
router.get('/', getEvents);

//create event (organizer only)
router.post('/',protect,isOrganizer,createEvent);

//organizer view registerations
router.get('/:id/registeration', protect, isOrganizer, getEventRegisteration);

module.exports = router;
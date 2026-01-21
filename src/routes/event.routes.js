const express = require('express');
const router = express.Router();

const {createEvent, getEvents} = require('../controllers/event.controller');
const {protect} = require('../middleware/auth');
const {isOrganizer} = require('../middleware/role');

//view events (optional auth)
router.get('/', getEvents);

//create event (organizer only)
router.post('/',protect,isOrganizer,createEvent);

module.exports = router;
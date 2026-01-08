const express = require('express');
const router = express.Router();

const {createEvent} = require('../controllers/event.controller');
const {protect} = require('../middleware/auth');
const {isOrganizer} = require('../middleware/role');

router.post('/',protect,isOrganizer,createEvent);

module.exports = router;
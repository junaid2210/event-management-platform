const Event = require('../models/Event.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const createEvent = catchAsync(async (req, res, next) => {
        const {title, description, date, time, venue, capacity, isPublished} = req.body;

        //1.Validate input
        if(!title || !description || !date || !time || !venue || !capacity){
            return next(new AppError('All fields are required',400));
        }

        //2.Create event
        const event = await Event.create({
            title,
            description,
            date,
            time,
            venue,
            capacity,
            isPublished,
            createdBy: req.user._id,
            collegeId: req.user.collegeId
        });

        res.status(201).json({
            message:'Event created successfully',
            event
        });
});

const getEvents = catchAsync(async (req, res, next) => {
        const {past} = req.query;

        const query = {
            isPublished: true
        };

        if(req.user){
            query.collegeId = req.user.collegeId;
        }

        const today = new Date();

        if(past === 'true'){
            query.date = {$lt: today};
        }
        else{
            query.date = {$gte: today};
        }

        const events = await Event.find(query).sort({date:1});

        res.json(events);
});

module.exports = {createEvent,getEvents};
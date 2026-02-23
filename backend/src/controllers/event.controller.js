const Event = require('../models/Event.model');
const ApiResponse = require('../utils/ApiResponse');
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
            isPublished: isPublished || false,
            createdBy: req.user._id,
            collegeId: req.user.collegeId
        });

        res.status(201).json(new ApiResponse(201,event,'Event created successfully'));
});

const getEvents = catchAsync(async (req, res, next) => {
        const {past} = req.query;

        if (!req.user) {
        return next(new AppError('Please login to view events for your college', 401));
        }

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

        const sortOrder = past === 'true' ? -1 : 1;
        const events = await Event.find(query).sort({date: sortOrder});

        res.status(200).json(new ApiResponse(200,{events},'Event fetched successfully'));
});

module.exports = {createEvent,getEvents};
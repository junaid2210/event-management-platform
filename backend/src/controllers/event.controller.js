const Event = require('../models/Event.model');
const ApiResponse = require('../utils/ApiResponse');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const createEvent = catchAsync(async (req, res, next) => {
        //Create event
        const event = await Event.create({
            ...req.body,
            createdBy: req.user._id,
            collegeId: req.user.collegeId
        });

        res.status(201).json(new ApiResponse(201,event,'Event created successfully'));
});

const getEvents = catchAsync(async (req, res, next) => {
        const {past, page, limit, search} = req.query;

        //Pagination logic
        const skip = (page - 1) * limit;

        const query = {
            isPublished: true,
            collegeId: req.user.collegeId
        };

        if(search) {
            query.title = { $regex: search, $options: 'i'};
        }

        const today = new Date();

        if(past === 'true'){
            query.date = {$lt: today};
        }
        else{
            query.date = {$gte: today};
        }

        //Execute query with pagination
        const events = await Event.find(query)
            .sort({date: past === 'true' ? -1 : 1})
            .skip(skip)
            .limit(limit);

        //Get Total Count for Frontend
        const totalEvents = await Event.countDocuments(query);

        res.status(200).json(new ApiResponse(200, {
            events,
            pagination: {
                totalEvents,
                currentPage: page,
                totalPages: Math.ceil(totalEvents/limit),
                hasNextPage: page * limit < totalEvents
            }
        },'Event fetched successfully'));
});

module.exports = {createEvent,getEvents};
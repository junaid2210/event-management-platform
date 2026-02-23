const Registration = require('../models/Registration.js');
const Event = require('../models/Event.model.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/AppError.js');
const ApiResponse = require('../utils/ApiResponse.js');

const registerForEvent = catchAsync(async (req, res, next) => {
        const eventId = req.params.id;
        const userId = req.user._id;

        //1. Fetch event
        const event = await Event.findById(eventId);
        if(!event) {
            return next(new AppError('Event not found',404));
        }

        //2. Must be Published
        if(!event.isPublished) {
            return next(new AppError('Event is not open for registration',403));
        }

        //3. Must be upcoming
        const today = new Date();
        if(event.date < today) {
            return next(new AppError('Registeratioin closed for this event',400));
        }

        //4. Student cannot be event creator
        if (event.createdBy.toString() === userId.toString()) {
            return next(new AppError('Cannot registering for your own event',403));
        }

        //5. Capacity check
        const registrationCount = await Registration.countDocuments({eventId : event._id});
        if(registrationCount >= event.capacity) {
            return next(new AppError('Event is full',400));
        }

        //6. Create registration (unique index enforces one-time)
        const registration = await Registration.create({
            userId,
            eventId
        });

        //7. Respond (controlled data)
        res.status(201).json(new ApiResponse(201,{
            event: {
                id: event._id,
                title: event.title,
                date: event.date,
                venue: event.venue
            },
            registrationId: registration._id
        },'Registered successfully'));
});

const getMyRegistration = catchAsync(async (req, res, next) => {
        const registrations = await Registration.find({
            userId: req.user._id,
        })
        .populate('eventId','title date time venue')
        .sort({ createdAt: -1 });

        const events = registrations
        .filter(reg => reg.eventId !== null)
        .map((reg) => ({
            registrationId : reg._id,
            event: reg.eventId,
            registeredAt: reg.createdAt
        }));

        res.status(200).json(new ApiResponse(200,events,'Registration fetched Successfully'));
});

const getEventRegistration = catchAsync(async (req, res, next) => {
        const eventId = req.params.id;

        //1. Fetch event
        const event = await Event.findById(eventId);
        if(!event) {
            return next(new AppError('Event not found',404));
        }

        //2. Ownership check
        if(event.createdBy.toString() !== req.user._id.toString()) {
            return next(new AppError('Access denied',403));
        }

        //3. Fetch registrations
        const registrations = await Registration.find({eventId})
        .populate('userId', 'name email')
        .sort({createdAt: -1});

        res.status(200).json(new ApiResponse(200,{
            event: {
                id: event._id,
                title: event.title,
                date: event.date,
                venue: event.venue,
                capacity: event.capacity
            },
            totalRegistrations: registrations.length,
            registrations: registrations.map((reg) => ({
                user: reg.userId,
                registeredAt: reg.createdAt
            }))
        },'fetched registration successfully'));
});

const cancelRegistration = catchAsync(async (req, res, next) => {
        const eventId = req.params.id;
        const userId = req.user._id;

        //1.Find Event
        const event = await Event.findById(eventId);
        if(!event){
            return next(new AppError('Event not found',404));
        }

        //2.Check event date (no cancel after event)
        const today = new Date();
        if(event.date < today) {
            return next(new AppError('Cannot cancel registration for past events',400));
        }

        //3. Find registration
        const registration = await Registration.findOne({
            userId,
            eventId
        });

        if(!registration) {
            return next(new AppError('Registration not found',404));
        }

        //4. Delete registration
        await registration.deleteOne();

        res.status(200).json(new ApiResponse(200,{},'Registration cancelled successfully'));
});

module.exports = { registerForEvent, getMyRegistration, getEventRegistration, cancelRegistration};
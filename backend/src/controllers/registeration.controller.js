const Registeration = require('../models/Registeration');
const Event = require('../models/Event.model.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/AppError.js');

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
            return next(new AppError('Event is not open for registeration',403));
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
        const registerationCount = await Registeration.countDocuments({eventId : event._id});
        if(registerationCount >= event.capacity) {
            return next(new AppError('Event is full',400));
        }

        //6. Create registeration (unique index enforces one-time)
        const registeration = await Registeration.create({
            userId,
            eventId
        });

        //7. Respond (controlled data)
        res.status(201).json({
            message: 'Registered successfully',
            event: {
                id: event._id,
                title: event.title,
                date: event.date,
                venue: event.venue
            },
            registerationId: registeration._id
        });
});

const getMyRegisteration = catchAsync(async (req, res, next) => {
        const registerations = await Registeration.find({
            userId: req.user._id,
        })
        .populate('eventId','title date time venue')
        .sort({ createdAt: -1 });

        const events = registerations
        .filter(reg => reg.eventId !== null)
        .map((reg) => ({
            registerationId : reg._id,
            event: reg.eventId,
            registeredAt: reg.createdAt
        }));

        res.status(200).json(events);
});

const getEventRegisteration = catchAsync(async (req, res, next) => {
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

        //3. Fetch registerations
        const registerations = await Registeration.find({eventId})
        .populate('userId', 'name email')
        .sort({createdAt: -1});

        res.json({
            event: {
                id: event._id,
                title: event.title,
                date: event.date,
                venue: event.venue,
                capacity: event.capacity
            },
            totalRegisterations: registerations.length,
            registerations: registerations.map((reg) => ({
                user: reg.userId,
                registeredAt: reg.createdAt
            }))
        });
});

const cancelRegisteration = catchAsync(async (req, res, next) => {
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
        const registeration = await Registeration.findOne({
            userId,
            eventId
        });

        if(!registeration) {
            return next(new AppError('Registeration not found',404));
        }

        //4. Delete registeration
        await registeration.deleteOne();

        res.json({message:'Registeration cancelled successfully'});
});

module.exports = { registerForEvent, getMyRegisteration, getEventRegisteration, cancelRegisteration};
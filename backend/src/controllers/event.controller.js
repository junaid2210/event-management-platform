const Event = require('../models/Event.model');
const ApiResponse = require('../utils/ApiResponse');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Registration = require('../models/Registration');

const createEvent = catchAsync(async (req, res, next) => {
        
        const imageUrl = req.file ? req.file.path : '';
        
        //Create event
        const event = await Event.create({
            ...req.body,
            image: imageUrl,
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

const getEventById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    // 1. Find the specific event by its ID
    const event = await Event.findById(id)
        .populate('createdBy', 'name email')
        .select('-__v');

    // 2. Error handling: If someone types a fake ID
    if (!event) {
        return res.status(404).json(
            new ApiResponse(404, null, 'Event not found')
        );
    }

    // 3. Making sure the event belongs to the user's college
    if (event.collegeId.toString() !== req.user.collegeId.toString()) {
         return res.status(403).json(
             new ApiResponse(403, null, 'You are not authorized to view events from other colleges')
         );
    }

    let isUserRegistered = false;

    if(req.user) {
        const existingUser = await Registration.findOne({
            eventId: event._id,
            userId: req.user._id 
        });

        if(existingUser) {
            isUserRegistered = true;
        }
    }

    const eventData = {
        ...event.toObject(),
        isUserRegistered // Injects true or false
    };

    // 4. Return the data using custom ApiResponse format
    res.status(200).json(
        new ApiResponse(200, eventData, 'Event fetched successfully')
    );
});

const getOrganizerEvents = catchAsync(async (req, res) => {
    const events = await Event.find({ createdBy: req.user._id})
        .sort({createdAt: -1})
        .lean();

    // Loop through and count registrations for each event
    for (let event of events) {
        const count = await Registration.countDocuments({ eventId: event._id });
        event.registeredCount = count; // Attach the count to the object
    }

    return res.status(200).json(
        new ApiResponse(200, events, 'Organizer events fetched successfully')
    );
});

const deleteEvent = catchAsync(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if(!event) {
        return res.status(404).json(
            new ApiResponse(404, null, 'Event not found')
        );
    }

    if(event.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json(
            new ApiResponse(403, null, 'You are not authorized to delete this event.')
        );
    }

    await event.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, null, 'Event deleted successfully')
    );
})

const getEventAttendees = catchAsync( async (req, res) => {
    //1. Verify the event exits and belongs to this organizer
    const event = await Event.findById(req.params.id);

    if(!event){
        return res.status(404).json(new ApiResponse(404, null, 'Event not found'));
    }

    if(event.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json(new ApiResponse(403, null, "Not authorized to view this event's attendees"));
    }

    //2. Fetch the registrations and populate the student details

    const attendees = await Registration.find({ eventId: req.params.id })
        .populate('userId','name email collegeId');

    //3. Return the data
    return res.status(200).json(
        new ApiResponse(200, attendees, 'Attendees fetched successfully')
    );
})

const updateEvent = catchAsync( async (req, res) => {
    
    //1. Find the event
    let event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).json(new ApiResponse(404, null, 'Event not found'));
    }

    //2. Ensure the logged-in organizer actually owns this event
    if (event.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json(new ApiResponse(403, null, 'You are not authorized to edit this event.'))
    }

    const updatePayload = { ...req.body };

    if (req.file) {
        updatePayload.image = req.file.path; 
    }

    //3. Update the event with the new data from req.body
    event = await Event.findByIdAndUpdate(req.params.id, updatePayload, {
        new: true,
        runValidators: true
    });

    //4. Return success response
    return res.status(200).json(
        new ApiResponse(200, event, 'Event updated successfully')
    );

});

const getMyTickets = catchAsync( async (req, res) => {
    const tickets = await Registration.find({userId: req.user._id})
        .populate('eventId', 'title date time venue')
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, tickets, 'Tickets fetched successfully')
    );
});

module.exports = {createEvent,getEvents,getEventById,getOrganizerEvents, deleteEvent, getEventAttendees, updateEvent, getMyTickets};
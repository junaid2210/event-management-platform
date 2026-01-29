const Registeration = require('../models/Registeration');
const Event = require('../models/Event.model.js');

const registerForEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user._id;

        //1. Fetch event
        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        //2. Must be Published
        if(!event.isPublished) {
            return res.status(403).json({ message: 'Event is not open for registeration'});
        }

        //3. Must be upcoming
        const today = new Date();
        if(event.date < today) {
            return res.status(400).json({ message: 'Registeratioin closed for this event'});
        }

        //4. Student cannot be event creator
        if (event.createdBy.toString() === userId.toString()) {
            return res.status(403).json({ message: 'Cannot registering for your own event'});
        }

        //5. Capacity check
        const registerationCount = await Registeration.countDocuments({eventId});
        if(registerationCount >= event.capacity) {
            return res.status(400).json({ message: 'Event is full'});
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
    } catch (error) {
        //Duplicate registeration error
        if(error.code === 11000) {
            return res.status(409).json({ message: 'Already registered for this event'});
        }
        
        console.error(error);
        res.status(500).json({ message: 'Server error'});
    }
};

const getMyRegisteration = async (req, res) => {
    try{
        const registerations = await Registeration.find({
            userId: req.user._id,
        })
        .populate('eventId','title date time venue')
        .sort({ createdAt: -1 });

        const events = registerations.map((reg) => ({
            registerationId : reg._id,
            event: reg.eventId,
            registeredAt: reg.createdAt
        }));

        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getEventRegisteration = async (req,res) => {
    try{
        const eventId = req.params.id;

        //1. Fetch event
        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).json({message:'Event not found'});
        }

        //2. Ownership check
        if(event.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({message:'Access denied'});
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
    } catch(error){
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
};

module.exports = { registerForEvent, getMyRegisteration, getEventRegisteration};
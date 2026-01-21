const Event = require('../models/Event.model');

const createEvent = async (req, res) => {
    try{
        const {title, description, date, time, venue, capacity} = req.body;

        //1.Validate input
        if(!title || !description || !date || !time || !venue || !capacity){
            return res.status(400).json({message:'All fields are required'});
        }

        //2.Create event
        const event = await Event.create({
            title,
            description,
            date,
            time,
            venue,
            capacity,
            createdBy: req.user._id,
            collegeId: req.user.collegeId
        });

        res.status(201).json({
            message:'Event created successfully',
            event
        });
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

const getEvents = async (req,res) => {
    try{
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
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
}

module.exports = {createEvent,getEvents};
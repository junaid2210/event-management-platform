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

module.exports = {createEvent};
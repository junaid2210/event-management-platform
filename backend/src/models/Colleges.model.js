const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "College name is required"],
            unique: true, // Prevents duplicate entries for the same college
            lowercase: true, // Extra layer of safety (matching your Zod normalization)
            trim: true,
            index: true // Makes searching for events by college much faster
        }
    },
    { 
        timestamps: true // Useful to see when a new college was "added" to your system
    }
);

module.exports = mongoose.model('College', collegeSchema);
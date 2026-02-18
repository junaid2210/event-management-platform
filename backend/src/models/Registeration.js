const mongoose = require('mongoose');

const registerationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        }
    },
    {timestamps: true}
);

//enforce one registeration per user per event
registerationSchema.index({userId: 1, eventId: 1}, {unique: true});

module.exports = mongoose.model("Registeration",registerationSchema);
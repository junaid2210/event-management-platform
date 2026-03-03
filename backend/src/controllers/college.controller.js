const ApiResponse = require('../utils/ApiResponse');
const catchAsync = require('../utils/catchAsync');
const College = require('../models/Colleges.model');

const getAllColleges = catchAsync(async (req, res) => {
    const colleges = await College.find().select('name _id');
    res.status(200).json(new ApiResponse(200, colleges, "Colleges fetched successfully"));
});

module.exports = {getAllColleges};
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const protect = catchAsync(async (req, res, next) => {
        const token = req.cookies.token;

        if(!token){
            return next(new AppError('Not authorized, not token',401));
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-passwordHash');

        if(!user){
            return next(new AppError('User not found', 401));
        }

        req.user = user;
        next();
});

module.exports = {protect};
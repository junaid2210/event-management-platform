const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const generateToken = require('../utils/generatetokens');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res, next) => {
        const {name, email, password, role, collegeId} = req.body;

        //1. validate input
        if(!name || !email || !password || !role || !collegeId){
            return next(new AppError('all fields are required', 400));
        }

        //2. check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return next(new AppError('User already exists', 409));
        }

        //3. Hash password
        const passwordHash = await bcrypt.hash(password,10);

        //4. Create User
        const user = await User.create({
            name,
            email,
            passwordHash,
            role,
            collegeId
        });

        //5. Respond 
        res.status(201).json({
            message: 'User registered successfully',
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
});

const login = catchAsync(async (req, res, next) => {
        const {email , password} = req.body;

        if(!email || !password) {
            return next(new AppError('Email and password are required',400));
        }

        const user = await User.findOne({email});
        if(!user){
            return next(new AppError('Invalid credentials', 401));
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch){
            return next(new AppError('Invalid credentials', 401));
        }

        const token = generateToken(user);

        //1. Prepare the response data
        const userData = user.toObject();
        delete userData.passwordHash;
        delete userData.__v;

        //2. Define the cookie
        const cookieOptions = {
            httpOnly : true,
            expires : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV == 'production' ? 'None' : 'lax',
        };
        
        res.status(200)
            .cookie('token',token,cookieOptions)
            .json({
                success: true,
                message: 'Logged in Successfully',
                user: userData,
            });
});

const logout = catchAsync(async (req, res, next) => {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
        });

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
});

const getMe = catchAsync(async (req,res) => {
        if(!req.user){
            return next(new AppError('Not authorized',401));
        }

        res.status(200).json({
            user: req.user
        });
});

module.exports = {register, login, logout, getMe};
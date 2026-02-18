const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const generateToken = require('../utils/generatetokens');

const register = async (req, res) => {
    try{
        const {name, email, password, role, collegeId} = req.body;

        //1. validate input
        if(!name || !email || !password || !role || !collegeId){
            return res.status(400).json({message:'all fields are required'});
        }

        //2. check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message:'User already exists'});
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
    } catch(error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
};

const login = async (req,res) => {
    try{
        const {email , password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message:'Email and password are required'});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch){
            return res.status(401).json({message:'Invalid credentials'});
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
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'});
    }
};

const logout = async (req, res) => {

    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
        });

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch(error){
        console.error(error);
        res.status(500).json({message:'Server Error during logout'})
    }
};

const getMe = async (req,res) => {
    try{
        if(!req.user){
            return res.status(401).json({message:'Not authorized'});
        }

        res.status(200).json({
            user: req.user
        });
    } catch(error){
        console.error(error);
        res.status(500).json({message:'Server Error'});
    }
}

module.exports = {register, login, logout, getMe};
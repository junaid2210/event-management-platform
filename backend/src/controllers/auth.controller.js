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
        
        res.json({
            message:'Login successful',
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }catch(err){
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
};

module.exports = {register, login};
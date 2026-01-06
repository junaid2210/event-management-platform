const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

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

module.exports = {register};
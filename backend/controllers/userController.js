import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import {validateRegister} from '../middleware/validatorMiddleware.js';

// @desc    Authenticate user/set token
// @route   POST/api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Login User'})
});

// @desc    Register a new user
// @route   POST/api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, role, birthDate, phoneNumber} = req.body;
    // console.log(`Welcome ${firstName} ${lastName}`)

    // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
    const { error } = validateRegister(req.body);

    if (error) {
        console.log(error);
        return res.send(error.details.map((item) => item.message));
    }

    // Chek if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Create a new user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role,
        birthDate,
        phoneNumber
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role
        });
        console.log(`Successfully signed up! ${user.firstName} ${user.lastName}`);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user
// @route   POST/api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Logout User'})
});

// @desc    Get user profile
// @route   GET/api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'User Profile'})
});

// @desc    Update user profile
// @route   PUT/api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Update User Profile'})
});

export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}
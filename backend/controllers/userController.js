import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { validateRegister } from "../middleware/validatorMiddleware.js";

// @desc    Authenticate user/set token
// @route   POST/api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Chek for user email
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const responseData = {
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
    };

    if (user.role === "teacher") {
      responseData.specialization = user.specialization;
    }
    generateToken(res, user._id);

    res.status(201).json(responseData);
    console.log(`Successfully signed up! ${user.firstName} ${user.lastName}`);
  } else {
    res.status(401); // Unauthorized
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST/api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    birthDate,
    phoneNumber,
    gender,
    specialization,
  } = req.body;

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
    phoneNumber,
    gender,
    // Add specialization only for teacher role
    specialization: role === "teacher" ? specialization : undefined,
  });

  if (user) {
    const responseData = {
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
    };

    if (user.role === "teacher") {
      responseData.specialization = user.specialization;
    }

    res.status(201).json(responseData);

    console.log(`Successfully signed up! ${user.firstName} ${user.lastName}`);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user
// @route   POST/api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

// @desc    Get user profile
// @route   GET/api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const responseData = {
    _id: req.user._id,
    name: `${req.user.firstName} ${req.user.lastName}`,
    email: req.user.email,
    role: req.user.role,
    imageUrl: req.user.imageUrl,
  };

  if (req.user.role === "teacher") {
    responseData.specialization = req.user.specialization;
  }
  res.status(200).json(responseData);
});

// @desc    Update user profile
// @route   PUT/api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.imageUrl = req.body.imageUrl || user.imageUrl;

    const updatedProfile = await user.save();

    res.status(200).json({ imageUrl: updatedProfile.imageUrl });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};

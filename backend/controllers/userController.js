import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { validateRegister } from "../middleware/validatorMiddleware.js";
import nodemailer from "nodemailer";
import Certificate from "../models/certificateModel.js";

const addCertificateToStudent = asyncHandler(async (req, res) => {
  const { certificateId } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.certificates.push(certificateId);

    await user.save();

    res
      .status(200)
      .json({ message: "User Certificates Updated Successfully !!" });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
});

// @desc    Authenticate user/set token
// @route   POST/api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Chek for user email
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

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
    // console.log(`Successfully logged in! ${user.firstName} ${user.lastName}`);
  } else {
    res.status(401); // Unauthorized
    throw new Error("Invalid email or password");
  }
});

// @desc    Get All Students
// @route   GET/api/users/
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate("certificates", "badges");

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500);
    throw new Error("Something Went Wrong");
  }
});

// @desc    Get Single Student
// @route   GET/api/users/:id
// @access  Private
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate(
    "certificates",
    "title"
  );
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "user not found" });
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
  const user = new User({
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

  await user.save();

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

    // console.log(`Successfully signed up! ${user.firstName} ${user.lastName}`);
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
  const userId = req.user._id;

  const user = await User.findById(userId)
    .populate("studentEnrollmentCourses", "-specialization")
    .exec();

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const populatedUser = {
    _id: user._id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
    imageUrl: user.imageUrl,
    birthDate: new Date(user.birthDate).toISOString().split("T")[0],
  };

  if (user.role === "teacher") {
    populatedUser.specialization = user.specialization;
    delete populatedUser.studentEnrollmentCourses;
    delete populatedUser.badges;
    delete populatedUser.certificates;
  } else {
    populatedUser.badges = user.badges;
    populatedUser.certificates = user.certificates;
    populatedUser.studentEnrollmentCourses = user.studentEnrollmentCourses;
    delete populatedUser.specialization;
  }

  res.json(populatedUser);
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

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const secret = process.env.JWT_FORGOT_PASSWORD_SECRET + user.password;
    const token = jwt.sign({ email: user.email, id: user.id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/api/users/forgot-password/${user._id}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lms.esa.team@gmail.com",
        pass: "iwemztrkompofvlu",
      },
    });
    const mailOptions = {
      from: "lms.esa.team@gmail.com",
      to: user.email,
      subject: "Reset LMS Password",
      html: `<div>
          <h4>Click on the link below to reset your password</h4>
          <a href="${link}"> Reset My Password</a>
      </div>`,
    };

    transporter.sendMail(mailOptions, function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: ", success.response);
      }
    });

    res.status(200).json({ message: "link-sent" });
  } else {
    res.status(404);
    throw new Error("Invalid Email");
  }
});

// @desc    Get reset password
// @route   GET/api/users/forgot-password/:userId/:token
// @access  Public
const getResetPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error("Invalid Email");
  }

  const secret = process.env.JWT_FORGOT_PASSWORD_SECRET + user.password;
  jwt.verify(req.params.token, secret, (error) => {
    if (error) {
      res.status(400);
      throw new Error(error.message);
    } else {
      res.status(200).json({ message: "reset password" });
    }
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const secret = process.env.JWT_FORGOT_PASSWORD_SECRET + user.password;
  jwt.verify(req.params.token, secret, async (error) => {
    if (error) {
      res.status(400);
      throw new Error(error.message);
    } else {
      user.password = req.body.password;
      await user.save();
      res.status(200).json({ message: "Password Reset Successfully" });
    }
  });
});

const getAllUserbyCourseId = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const getAllStudents = await User.find({
    studentEnrollmentCourses: courseId,
  })
    .populate({
      path: "submitted",
      populate: {
        path: "activityId",
        model: "Activity",
        strictPopulate: false,
      },
    })
    .exec();

  if (getAllStudents) {
    res.status(200).json(getAllStudents);
  } else {
    res.status(500).json({ message: "Something Went Wrong!!!" });
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  forgotPassword,
  getResetPassword,
  resetPassword,
  getAllUserbyCourseId,
  addCertificateToStudent,
};

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const isTeacher = asyncHandler((req, res, next) => {
  if (req.user && req.user.role === "teacher") {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized");
  }
});

export { protect, isTeacher };

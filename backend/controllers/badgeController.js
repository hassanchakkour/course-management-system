import asyncHandler from "express-async-handler";
import Badge from "../models/badgeModel.js";
import User from "../models/userModel.js";

const createBadge = asyncHandler(async (req, res) => {
  const { title, description, imageUrl, courseId } = req.body;

  // Chek if user exists
  const checkbadge = await Badge.findOne({ title });

  if (checkbadge) {
    res.status(400);
    throw new Error("Badge already Exists");
  } else {
    // Create a new Badge
    const badge = await Badge.create({
      title,
      description,
      courseId,
      imageUrl,
    });
    res.status(201).json(badge);
  }
});

const getAllBadges = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  try {
    const badge = await Badge.find({ courseId: courseId });
    res.status(200).json(badge);
  } catch (error) {
    res.status(500).json({ message: "something Went Wrong" });
  }
});

const getSingleBadge = asyncHandler(async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (badge) {
      res.status(200).json(badge);
    } else {
      res.status(404).json({ message: "Badge not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const updateBadge = asyncHandler(async (req, res) => {
  const badge = await Badge.findById(req.params.id);

  if (badge) {
    badge.title = req.body.title || badge.title;
    badge.description = req.body.description || badge.description;
    badge.imageUrl = req.body.imageUrl || badge.imageUrl;

    await badge.save();
    res.status(200).json(badge);
  } else {
    res.status(404);
    throw new Error("Badge Doesn't Exist");
  }
});

const deleteBadge = asyncHandler(async (req, res) => {
  const { id } = req.body;

  try {
    const deletedBadge = await Badge.findByIdAndDelete(id);

    if (deletedBadge) {
      res.status(200).json({ message: "Badge deleted successfully." });
    } else {
      res.status(404).json({ message: "Badge not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting Badge.", error });
  }
});

const updateStudentBadge = asyncHandler(async (req, res) => {
  const { badgeId, studentId } = req.body;
  const findBadge = await Badge.findById(badgeId);
  if (findBadge) {
    const addTonewModules = await User.findOneAndUpdate(
      { _id: studentId },
      { $push: { badges: { $each: [`${findBadge._id}`] } } }
    );

    res.status(200).json({ message: "Added Badge to Student !" });
  }
});

const checkIfBadgeExist = asyncHandler(async (req, res) => {
  const { studentId, badgeId } = req.body;

  const student = await User.findById(studentId);
  let asd;
  console.log(student.badges.includes(badgeId));
  asd = student.badges.includes(badgeId);
  res.status(200).json(asd);
});

export {
  createBadge,
  getAllBadges,
  getSingleBadge,
  updateBadge,
  deleteBadge,
  updateStudentBadge,
  checkIfBadgeExist,
};

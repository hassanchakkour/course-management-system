import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";

// @desc    Get all courses of the authenticated teacher
// @route   GET /api/courses
// @access  Private (Teacher)
const getCourses = asyncHandler(async (req, res) => {
  const { teacherId } = req.body;
  const courses = await Course.find({ teacherId: teacherId });

  if (courses.length > 0) {
    res.status(200).json(courses);
  } else {
    res.status(404);
    throw new Error("No courses found for the authenticated teacher");
  }
});

// @desc    Get a specific course by ID (if it belongs to the authenticated teacher)
// @route   GET /api/courses/:id
// @access  Private (Teacher)
const getCourseById = asyncHandler(async (req, res) => {
  const teacherId = req.user._id;
  const course = await Course.findOne({ _id: req.params.id, teacherId });

  if (course) {
    res.status(200).json(course);
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Teacher)
const createCourse = asyncHandler(async (req, res) => {
  const { title, description, duration } = req.body;
  const teacherId = req.user._id;

  const course = await Course.create({
    title,
    description,
    teacherId,
    duration,
  });

  if (course) {
    res.status(201).json(course);
  } else {
    res.status(400);
    throw new Error("Invalid course data");
  }
});

// @desc    Update a course by ID (if it belongs to the authenticated teacher)
// @route   PUT /api/courses/:id
// @access  Private (Teacher)

const updateCourse = asyncHandler(async (req, res) => {
  const { title, description, duration } = req.body;
  const teacherId = req.user._id;

  let course = await Course.findOne({ _id: req.params.id, teacherId });

  if (course) {
    course.title = title || course.title;
    course.description = description || course.description;
    course.duration = duration || course.duration;

    course = await course.save();

    res.status(200).json(course);
  } else {
    res.status(404);
    throw new Error("Course not found or unauthorized");
  }
});

// @desc    Delete a course by ID (if it belongs to the authenticated teacher)
// @route   DELETE /api/courses/:id
// @access  Private (Teacher)
const deleteCourse = asyncHandler(async (req, res) => {
  const teacherId = req.user._id;
  const course = await Course.findOne({ _id: req.params.id, teacherId });

  if (course) {
    await Course.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Course removed" });
  } else {
    res.status(404);
    throw new Error("Course not found or unauthorized");
  }
});

export { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };

import Activity from "../models/activityModel.js";
import asyncHandler from "express-async-handler";

// @desc    Create a new activity
// @route   POST /api/activities
// @access  Private (Teacher only)
const postActivity = asyncHandler(async (req, res) => {
  const { title, submoduleId } = req.body;
  const teacherId = req.user._id;

  if (!submoduleId) {
    res.status(400);
    throw new Error("submoduleId is required");
  }

  const activity = await Activity.create({
    title,
    teacherId,
    submoduleId,
  });
  res.status(201).json(activity);
});

// @desc    Get all activities by submodule ID
// @route   GET /api/activities/submodule/:submoduleId
// @access  Private (Teacher only)
const getActivitiesBySubModuleId = asyncHandler(async (req, res) => {
  const submoduleId = req.params.submoduleId;

  const activities = await Activity.find({ submoduleId });

  if (activities.length > 0) {
    res.status(200).json(activities);
  } else {
    res.status(404);
    throw new Error("No activities found for the specified submodule");
  }
});

// @desc    Get a specific activity by ID
// @route   GET /api/activities/:id
// @access  Private (Teacher only)
const getActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findOne({ _id: req.params.id }).populate('submitted','studentId')

  if (activity) {
    res.status(200).json(activity);
  } else {
    res.status(404).json({ message: "Activity not found" });
  }
});

// @desc    Delete an activity by ID
// @route   DELETE /api/activities/:id
// @access  Private (Teacher only)
const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findOneAndDelete({ _id: req.params.id });

  if (activity) {
    res.status(200).json({ message: "Activity deleted" });
  } else {
    res.status(404).json({ message: "Activity not found or unauthorized" });
  }
});

// @desc    Update an activity by ID
// @route   PUT /api/activities/:id
// @access  Private (Teacher only)
const putActivity = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    subModuleId,
    type,
    passingGrade,
    startDate,
    endDate,
    duration,
    mediaUrl,
  } = req.body;

  const activity = await Activity.findOne({ _id: req.params.id });

  if (!activity) {
    throw new Error("Activity not found");
  }

  Object.assign(activity, {
    title: title || activity.title,
    description: description || activity.description,
    subModuleId: subModuleId || activity.subModuleId,
    type: type || activity.type,
    passingGrade: passingGrade || activity.passingGrade,
    startDate: startDate || activity.startDate,
    endDate: endDate || activity.endDate,
    duration: duration || activity.duration,
    mediaUrl: mediaUrl || activity.mediaUrl,
  });

  await activity.save();

  res.status(200).json(activity);
});

export {
  postActivity,
  getActivity,
  getActivitiesBySubModuleId,
  deleteActivity,
  putActivity,
};

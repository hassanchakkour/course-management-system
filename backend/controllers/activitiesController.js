import Activity from "../models/activityModel.js";
import asyncHandler from "express-async-handler";

// Create a new activity
const postActivity = asyncHandler(async (req, res) => {
  const { title } = req.body;

  try {
    const activity = await Activity.create({ title });
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all activities
const getActivities = asyncHandler(async (req, res) => {
  try {
    const activities = await Activity.find({});
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Get a specific activity by ID
const getActivity = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.findOne({ _id: req.params.id });
    if (activity) {
      res.status(200).json(activity);
    } else {
      res.status(404).json({ message: "Activity not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Delete an activity by ID
const deleteActivity = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.findOneAndDelete({ _id: req.params.id });
    if (activity) {
      res.status(200).json({ message: "Activity deleted" });
    } else {
      res.status(404).json({ message: "Activity not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Update an activity by ID
const putActivity = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (activity) {
      res.status(200).json(activity);
    } else {
      res.status(404).json({ message: "Activity not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

export {
  postActivity,
  getActivity,
  getActivities,
  deleteActivity,
  putActivity,
};

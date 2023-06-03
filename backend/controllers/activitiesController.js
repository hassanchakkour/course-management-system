import Activity from "../models/activityModel.js";

// Create a new activity
const postActivity = async (req, res) => {
  const { title, description, moduleId } = req.body;

  try {
    const activity = await Activity.create({ title, description, moduleId });
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all activities
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({});
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get a specific activity by ID
const getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (activity) {
      res.status(200).json(activity);
    } else {
      res.status(404).json({ message: "Activity not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete an activity by ID
const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (activity) {
      res.status(200).json({ message: "Activity deleted" });
    } else {
      res.status(404).json({ message: "Activity not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Update an activity by ID
const putActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (activity) {
      res.status(200).json(activity);
    } else {
      res.status(404).json({ message: "Activity not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};

export {
  postActivity,
  getActivity,
  getActivities,
  deleteActivity,
  putActivity,
};
const Activity = require('../models/activityModel');
const mongoose = require('mongoose');

// Get all activities
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({});
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a specific activity by ID
const getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (activity) {
      res.status(200).json(activity);
    } else {
      res.status(404).json({ message: 'Activity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new activity
const postActivity = async (req, res) => {
  const { type, title, description, deadline, moduled } = req.body;
  try {
    const newActivity = await Activity.create({ type, title, description, deadline, moduled });
    res.status(200).json(newActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an activity by ID
const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (activity) {
      res.status(200).json(activity);
    } else {
      res.status(404).json({ message: 'Activity not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid Request' });
  }
};

// Delete an activity by ID
const delActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (activity) {
      res.status(200).json({ message: 'Activity deleted' });
    } else {
      res.status(404).json({ message: 'Activity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  postActivity,
  getActivities,
  getActivity,
  delActivity,
  updateActivity
};

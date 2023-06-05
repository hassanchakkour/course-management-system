import Submission from '../models/submissionModel.js';
import asyncHandler from 'express-async-handler';

// Create a new submission
const postSubmission = asyncHandler(async (req, res) => {
  const { activityId, userId, submissionDate, fileUrl } = req.body;
  const teacherId = req.user._id;

  try {
    const submission = await Submission.create({ activityId, userId, submissionDate, fileUrl, teacherId });
    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all submissions
const getSubmissions = asyncHandler(async (req, res) => {
  const teacherId = req.user._id;

  try {
    const submissions = await Submission.find({ teacherId });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get a specific submission by ID
const getSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const teacherId = req.user._id;

  try {
    const submission = await Submission.findOne({ _id: id, teacherId });
    if (submission) {
      res.status(200).json(submission);
    } else {
      res.status(404).json({ message: 'Submission not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a submission by ID
const deleteSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const teacherId = req.user._id;

  try {
    const submission = await Submission.findOneAndDelete({ _id: id, teacherId });
    if (submission) {
      res.status(200).json({ message: 'Submission deleted' });
    } else {
      res.status(404).json({ message: 'Submission not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update a submission by ID
const putSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const teacherId = req.user._id;

  try {
    const submission = await Submission.findOneAndUpdate({ _id: id, teacherId }, req.body, { new: true });
    if (submission) {
      res.status(200).json(submission);
    } else {
      res.status(404).json({ message: 'Submission not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

export {
  postSubmission,
  getSubmission,
  getSubmissions,
  deleteSubmission,
  putSubmission
};

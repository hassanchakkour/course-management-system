
import Question from '../models/questionModel.js';
import asyncHandler from "express-async-handler";

// Create a new question
const postQuestion = asyncHandler(async (req, res) => {
  try {
    const { activityId, content, options, correctOption } = req.body;
    const teacherId = req.user.id; // Assuming user object is available with an id property

    // Create a new question document
    const question = await Question.create({
      activityId,
      content,
      options,
      correctOption,
      teacherId,
    });

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all questions for a specific TeacherID (user.id)
const getQuestions = asyncHandler(async (req, res) => {
  try {
    const teacherId = req.user._id; // Assuming user object is available with an id property
    console.log(teacherId)
    const questions = await Question.find({teacherId});
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific question by ID for a specific TeacherID (user.id)
const getQuestion = asyncHandler(async (req, res) => {
  try {
    const teacherId = req.user.id; // Assuming user object is available with an id property
    const question = await Question.findOne({ _id: req.params.id });
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a question by ID for a specific TeacherID (user.id)
const putQuestion = asyncHandler(async (req, res) => {
  try {
    const { activityId, content, options, correctOption } = req.body;
    const teacherId = req.user.id; // Assuming user object is available with an id property

    const question = await Question.findOneAndUpdate(
      { _id: req.params.id},
      { activityId, content, options, correctOption },
      { new: true }
    );

    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid Request' });
  }
});

// Delete a question by ID for a specific TeacherID (user.id)
const deleteQuestion = asyncHandler(async (req, res) => {
  try {
    const teacherId = req.user.id; // Assuming user object is available with an id property
    const question = await Question.findOneAndDelete({ _id: req.params.id });
    if (question) {
      res.status(200).json({ message: 'Question deleted' });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export {
  postQuestion,
  getQuestions,
  getQuestion,
  deleteQuestion,
  putQuestion,
};

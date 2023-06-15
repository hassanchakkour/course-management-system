import Question from "../models/questionModel.js";
import asyncHandler from "express-async-handler";

// @desc    Create a new Question
// @route   POST /api/questions
// @access  Private (Teacher only)
const postQuestion = asyncHandler(async (req, res) => {
  const { activityId, type, content, options, correctOption } = req.body;
  const teacherId = req.user.id;

  if (!activityId) {
    res.status(400);
    throw new Error("activityId is required");
  }

  const question = await Question.create({
    activityId,
    type,
    content,
    options,
    teacherId,
  });

  res.status(201).json(question);
});

// @desc    Get all questions by activity ID
// @route   GET /api/questions/activity/:activityId
// @access  Private (Teacher only)
const getQuestionsByactivityId = asyncHandler(async (req, res) => {
  const activityId = req.params.activityId;

  const questions = await Question.find({ activityId });

  if (questions.length > 0) {
    res.status(200).json(questions);
  } else {
    res.status(404);
    throw new Error("No questions found for the specified submodule");
  }
});

// @desc    Get a specific question by ID
// @route   GET /api/questions/:id
// @access  Private (Teacher only)
const getQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findOne({ _id: req.params.id });

  if (question) {
    res.status(200).json(question);
  } else {
    res.status(404).json({ message: "Question not found" });
  }
});

// Update a question by ID for a specific TeacherID (user.id)
const putQuestion = asyncHandler(async (req, res) => {
  const { activityId, content, options, correctOption } = req.body;

  const question = await Question.findOne({ _id: req.params.id });

  if (!question) {
    throw new Error("Question not found");
  }

  Object.assign(question, {
    content: content || question.content,
    options: options || question.options,
    activityId: activityId || question.activityId,
    correctOption: correctOption || question.correctOption,
  });

  await question.save();

  res.status(200).json(question);
});

// @desc    Delete a question by ID
// @route   DELETE /api/questions/:id
// @access  Private (Teacher only)
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findOneAndDelete({ _id: req.params.id });

  if (question) {
    res.status(200).json({ message: "Question deleted" });
  } else {
    res.status(404).json({ message: "Question not found or unauthorized" });
  }
});

export {
  postQuestion,
  getQuestionsByactivityId,
  getQuestion,
  deleteQuestion,
  putQuestion,
};

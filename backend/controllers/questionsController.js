import asyncHandler from "express-async-handler";
import Question from "../models/questionModel.js";
import Activity from "../models/activityModel.js";

// @desc    Create a new Question
// @route   POST /api/questions
// @access  Private (Teacher only)
const postQuestion = asyncHandler(async (req, res) => {
  const {
    activityId,
    title,
    type,
    questionContent,
    options,
    teacherId,
    point,
    correctOption,
    correctResponse,
  } = req.body;

  if (!activityId) {
    console.log("hello");
    res.status(400);
    throw new Error("activityId is required");
  }

  const question = await Question.create({
    activityId,
    title,
    type,
    questionContent,
    options,
    point,
    teacherId,
    correctOption,
    correctResponse,
  });

  if (question) {
    const addToActivity = await Activity.findById(activityId);
    console.log(addToActivity);
    addToActivity.questionId.push(question._id);
    console.log(addToActivity._id);

    await addToActivity.save();
  }

  res.status(201).json(question);
});

// @desc    Get all questions by activity ID
// @route   GET /api/questions/activity/:activityId
// @access  Private (Teacher only)
const getQuestionsByactivityId = asyncHandler(async (req, res) => {
  const { activityId } = req.body;

  const questions = await Question.find({ activityId });
  console.log(questions.length);

  if (questions.length > 0) {
    res.status(200).json(questions);
  } else {
    res.status(404);
    throw new Error("No questions found for the specified activity");
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
  const { activityId, title, point, correctOption } = req.body;

  const question = await Question.findOne({ _id: req.params.id });

  if (!question) {
    throw new Error("Question not found");
  }

  Object.assign(question, {
    title: title || question.title,
    point: point || question.point,
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
  const { activityId } = req.body;
  const question = await Question.findOneAndDelete({ _id: req.params.id });

  if (question) {
    const removeFromActivity = await Activity.findOneAndUpdate(
      { _id: activityId },
      { $pull: { questionId: { $in: [`${question._id}`] } } }
    );
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

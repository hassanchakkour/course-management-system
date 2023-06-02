import Question from '../models/questionModel.js';



// Create a new question
const postQuestion = async (req, res) => {
  try {
    const { activityId, content, options, correctOption } = req.body;

    // Create a new question document
    const question = await Question.create({
      activityId,
      content,
      options,
      correctOption,
    });

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a specific question by ID
const getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a question by ID
const putQuestion = async (req, res) => {
  try {
    const { activityId, content, options, correctOption } = req.body;

    const question = await Question.findByIdAndUpdate(
      req.params.id,
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
};

// Delete a question by ID
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (question) {
      res.status(200).json({ message: 'Question deleted' });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};



export {
    postQuestion,
    getQuestions,
    getQuestion,
    deleteQuestion,
    putQuestion,
}
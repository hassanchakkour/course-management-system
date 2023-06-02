import Submission from '../models/submissionModel.js'



// Create a new submission
const postSubmission = async (req, res) => {
  const { activityId, userId, submissionDate, fileUrl } = req.body;

  try {
    const submission = await Submission.create({ activityId, userId, submissionDate, fileUrl });
    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all submissions
const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({});
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get a specific submission by ID
const getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (submission) {
      res.status(200).json(submission);
    } else {
      res.status(404).json({ message: 'Submission not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a submission by ID
const deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (submission) {
      res.status(200).json({ message: 'Submission deleted' });
    } else {
      res.status(404).json({ message: 'Submission not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update a submission by ID
const putSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (submission) {
      res.status(200).json(submission);
    } else {
      res.status(404).json({ message: 'Submission not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};



export {
    postSubmission,
    getSubmission,
    getSubmissions,
    deleteSubmission,
    putSubmission
}
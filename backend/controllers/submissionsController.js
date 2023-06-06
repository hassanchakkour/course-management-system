import Submission from '../models/submissionModel.js';
import Activity from'../models/activityModel.js'
import asyncHandler from 'express-async-handler';

// Create a new submission
const postSubmission = asyncHandler(async (req, res) => {
  const { activityId, userId, submissionDate, fileUrl } = req.body;
  const teacherId = req.user._id;

  
  //const studentId = req.user._id;

  try {
    // Check if the activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found okkk' });
    }

    // Create a new submission
   
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

//  import asyncHandler from 'express-async-handler';
// import Submission  from '../models/submissionModel.js'
// import Activity from'../models/activityModel.js'


// // Submit an activity by a student
// const submitActivity = asyncHandler(async (req, res) => {
//   const { activityId, answers } = req.body;
//   const studentId = req.user._id;

//   try {
//     // Check if the activity exists
//     const activity = await Activity.findById(activityId);
//     if (!activity) {
//       return res.status(404).json({ message: 'Activity not found' });
//     }

//     // Create a new submission
//     const submission = await Submission.create({
//       activityId,
//       studentId,
//       answers,
//     });

//     // Update the activity's submission status
//     activity.submitted = true;
//     await activity.save();

//     res.status(201).json(submission);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Get all submissions for a specific activity (accessible by teacher)
// const getSubmissionsByActivity = asyncHandler(async (req, res) => {
//   const { activityId } = req.params;
//   const teacherId = req.user._id;

//   try {
//     // Check if the activity exists and belongs to the teacher
//     const activity = await Activity.findOne({
//       _id: activityId,
//       teacherId,
//     });
//     if (!activity) {
//       return res.status(404).json({ message: 'Activity not found' });
//     }

//     // Get all submissions for the activity
//     const submissions = await Submission.find({ activityId });
//     res.status(200).json(submissions);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// });

// // Get all submissions by a specific student (accessible by teacher)
// const getSubmissionsByStudent = asyncHandler(async (req, res) => {
//   const { studentId } = req.params;
//   const teacherId = req.user._id;

//   try {
//     // Check if the student exists and the teacher is allowed to access their submissions
//     // (You may have additional logic here based on your application's requirements)
//     const student = await Student.findOne({ _id: studentId, teacherId });
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     // Get all submissions made by the student
//     const submissions = await Submission.find({ studentId });
//     res.status(200).json(submissions);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// });




// export {
//   submitActivity,
//   getSubmissionsByActivity,
//   getSubmissionsByStudent 
// };

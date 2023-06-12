import Submission from "../models/submissionModel.js";
import Activity from "../models/activityModel.js";
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler";


const createSubmission = async (req, res) => {
  try {
    const { activityId, studentId, fileUrl } = req.body; // Get the activityId, studentId, and fileUrl from the request body

    // Check if the activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    // Check if the student exists (if needed)
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Create a new submission
    const submission = new Submission({
      activityId,
      studentId,
      fileUrl,

    });


    // Save the submission
    await submission.save();

    // Update the submitted array in the activity
    activity.submitted.push(studentId);
    await activity.save();

    res.status(201).json({ message: 'Submission created successfully', submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



// Get all submissions
const getSubmissions = asyncHandler(async (req, res) => {
 

  try {
    const submissions = await Submission.find({  });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

//getSUBMISSIOn by activity
const getSubmissionsByActivity = async (req, res) => {
  try {
    const { activityId } = req.params; // Get the activityId from the request parameters

    // Check if the activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    // Get all submissions for the activity
    const submissions = await Submission.find({ activityId });

    res.status(200).json({ submissions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Delete a submission by ID
// const deleteSubmission = asyncHandler(async (req, res) => {
//   try {
//     const submissionId = req.params.id;
//     // Assuming you have implemented authentication and have access to the teacher's ID
//     const teacherId = req.user._id; // Fetch the teacher's ID from the authenticated user

//     // Find the submission by ID and check if the associated teacher matches the authenticated teacher
//     const submission = await Submission.findById(submissionId).populate('activityId','title');
//     if (!submission) {
//       return res.status(404).json({ message: 'Submission not found' });
//     }

//     // Check if the authenticated teacher is the owner of the associated activity
//     if (submission.activityId.teacherId.toString() !== teacherId) {
//       return res.status(403).json({ message: 'Unauthorized to delete this submission' });
//     }

//     // Delete the submission from the database
//     await submission.delete();

//     res.status(200).json({ message: 'Submission deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error deleting submission' });
//   }
  

// });

// Update a submission by ID
const putSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const teacherId = req.user._id;

  try {
    const submission = await Submission.findOneAndUpdate(
      { _id: id, teacherId },
      req.body,
      { new: true }
    );
    if (submission) {
      res.status(200).json(submission);
    } else {
      res.status(404).json({ message: "Submission not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

export {
  createSubmission,
  getSubmissions,
  getSubmissionsByActivity,
  
 
  putSubmission,
};

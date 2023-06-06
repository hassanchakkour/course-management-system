import express from'express';

const router = express.Router();

import {
    postSubmission,
    getSubmission,
    getSubmissions,
    deleteSubmission,
    putSubmission
} from '../controllers/submissionsController.js'
import { protect, isTeacher } from "../middleware/authMiddleware.js";

router.post('/',protect,isTeacher,postSubmission);
router.get('/',protect,isTeacher,getSubmissions);//get all submission
router.get('/:id',protect,isTeacher,getSubmission);//get single submission
router.delete('/:id',protect,isTeacher,deleteSubmission);
router.put('/:id',protect,isTeacher,putSubmission);


export default router;

// // Submit an activity by a student
// router.post('/submission', submissionController.submitActivity);

// // Get all submissions for a specific activity (accessible by teacher)
// router.get('/submissions/activity/:activityId', submissionController.getSubmissionsByActivity);

// // Get all submissions by a specific student (accessible by teacher)
// router.get('/submissions/student/:studentId', submissionController.getSubmissionsByStudent);



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
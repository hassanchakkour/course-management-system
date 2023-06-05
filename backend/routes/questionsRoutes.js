import express from 'express';
const router = express.Router();

import {
    postQuestion,
    getQuestions,
    getQuestion,
    deleteQuestion,
    putQuestion,

} from '../controllers/questionsController.js'
import { protect, isTeacher } from "../middleware/authMiddleware.js";

router.post('/',protect,isTeacher,postQuestion);
router.get('/',protect,isTeacher,getQuestions);//get all submission
router.get('/:id',protect,isTeacher,getQuestion);//get single submission
router.delete('/:id',protect,isTeacher,deleteQuestion);
router.put('/:id',protect,isTeacher,putQuestion);

export default router;


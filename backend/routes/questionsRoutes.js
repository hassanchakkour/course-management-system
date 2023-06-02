import express from 'express';
const router = express.Router();

import {
    postQuestion,
    getQuestions,
    getQuestion,
    deleteQuestion,
    putQuestion,

} from '../controllers/questionsController.js'

router.post('/',postQuestion);
router.get('/',getQuestions);//get all submission
router.get('/:id',getQuestion);//get single submission
router.delete('/:id',deleteQuestion);
router.put('/:id',putQuestion);

export default router;


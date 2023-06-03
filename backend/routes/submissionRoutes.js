import express from'express';
const router = express.Router();

import {
    postSubmission,
    getSubmission,
    getSubmissions,
    deleteSubmission,
    putSubmission
} from '../controllers/submissionsController.js'

router.post('/',postSubmission);
router.get('/',getSubmissions);//get all submission
router.get('/:id',getSubmission);//get single submission
router.delete('/:id',deleteSubmission);
router.put('/:id',putSubmission);

export default router;
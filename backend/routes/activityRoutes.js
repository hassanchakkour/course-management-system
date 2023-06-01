import express from 'express'
import { postActivity,
        getActivity,
        getActivites,
        deleteActivity,
        putActivity } from '../controllers/activitesController.js'

const router = express.Router()

router.post('/',postActivity);
router.get('/',getActivites);
router.get('/:id',getActivity);
router.delete('/:id',deleteActivity);
router.put('/:id',putActivity)

export default router;
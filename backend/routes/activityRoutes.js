import express from 'express';

const router = express.Router();

// const {
//     createActivity,
//     getActivities,
//     getActivity,
//     deleteActivity,
//     updateActivity

//     }= require ('../controllers/activitesController.js')
// activityRoutes.js

import { postActivity, getActivities, getActivity, delActivity, updateActivity } from '../controllers/activitesController.js';



//atach to a handler to this
//Get all posts
router.get('/activites', getActivities)

//GET single post
router.get('/activites/:id',getActivity)

//POST a new post
router.post('/activites', postActivity)

//delete a post
router.delete('/activites/:id',  delActivity )

//UPDATE A post
router.patch('/activites/:id', updateActivity)


export default router;


import express from 'express';
const router = express.Router();
import { postActivity, getActivities, getActivity, deleteActivity, updateActivity } from '../controllers/activitesController';

// Get all activities
router.get('/activities', getActivities);

// Get a specific activity by ID
router.get('/activities/:id', getActivity);

// Create a new activity
router.post('/activities', postActivity);

// Delete an activity by ID
router.delete('/activities/:id', deleteActivity);

// Update an activity by ID
router.patch('/activities/:id', updateActivity);

export default router;

import mongoose from "mongoose";

import { postActivity,getActivity,getActivites,deleteActivity,putActivity } from '../controllers/activitesController'


router.post('/activites',postActivity);
router.post('./activites',getActivites);
router.post('./activites/:id',getActivity);
router.post('./activites/:id',deleteActivity);
router.post('./activites/:id',putActivity)
export default router;
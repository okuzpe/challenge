import express from 'express';
import { getChargers } from './charger';

/* Routes */
const router = express.Router();

//Chargers
router.use('/chargers', getChargers);

export default router;

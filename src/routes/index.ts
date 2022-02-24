import express from 'express';
import { createCharger, getChargerById, getChargers, updateCharger, updateChargerNotify } from './charger';
import { createUser, getUserById, getUsers, updateUser, updateUserNotify } from './user';
import { createSession, getSessionById, getSessions, updateSession } from './session';
import { sendEmailTest } from './email';

/* Routes */
const router = express.Router();

//Chargers
router.post('/charger', createCharger);
router.get('/chargers', getChargers);
router.get('/charger/:id', getChargerById);
router.put('/charger/:id', updateCharger);
router.patch('/charger/:id', updateChargerNotify);

//Sessions
router.post('/session', createSession);
router.get('/sessions', getSessions);
router.get('/session/:id', getSessionById);
router.put('/session/:id', updateSession);

//Users
router.post('/user', createUser);
router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.patch('/user/:id', updateUserNotify);

//Email Test route
router.post('/test-send-mail', sendEmailTest);

export default router;

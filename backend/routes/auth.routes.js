import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const router = express.Router();




router.route('/route').post(register);
router.route('/login').post(login);




export default router;
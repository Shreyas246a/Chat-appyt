import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';
import { jwtAuth } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();




router.route('/signup').post(upload.single(
    'profileImage'
),signup);
router.route('/login').post(upload.none(),login);
router.route('/logout').post(jwtAuth,logout);



export default router;
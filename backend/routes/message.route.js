import express from 'express';
import { jwtAuth } from '../middleware/auth.middleware.js';
import { getAllUsers, getMessages, getUserById, sendMessage } from '../controllers/message.controller.js';
import { upload } from '../middleware/multer.middleware.js';
const router = express.Router();


router.route("/Users").get(jwtAuth,getAllUsers);
router.route("/Users/:id").get(jwtAuth,getUserById);
router.route("/Messages/:id").get(jwtAuth,getMessages);
router.route("/SendMessage/:id").post(upload.single(
    'image'
),jwtAuth,sendMessage);


export default router;
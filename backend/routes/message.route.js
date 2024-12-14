import express from 'express';
import { jwtAuth } from '../middleware/auth.middleware.js';
import { getMessages } from '../controllers/message.controller.js';
import { upload } from '../middleware/multer.middleware.js';
const router = express.Router();


router.route("/Users").get(jwtAuth,getAllUsers);
router.route("/Users/:id").get(jwtAuth,getUserById);
router.route("/Messages/:id").get(jwtAuth,getMessages);
router.route("/send/:id").post(upload.single(
    'image'
),jwtAuth,sendMessage);
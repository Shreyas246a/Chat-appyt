import express from 'express';
import { jwtAuth } from '../middleware/auth.middleware.js';
const router = express.Router();


router.route("/Users").get(jwtAuth,getAllUsers);
router.route("/Users/:id").get(jwtAuth,getUserById);
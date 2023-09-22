import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
import webController from '../controllers/webController.js';
import webAuth from '../middleware/webAuth.js';


router.get("/signin", [], webController.signIn);

export default router;

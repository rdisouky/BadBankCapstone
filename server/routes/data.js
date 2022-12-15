import express from 'express';
import { getAllData } from '../controllers/data.js';
const router = express.Router();

router.post('/', getAllData);

export default router;
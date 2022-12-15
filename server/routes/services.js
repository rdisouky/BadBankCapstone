import express from 'express';
import { deposit, withdraw } from '../controllers/services.js';
const router = express.Router();

router.post('/deposit', deposit);
router.post('/withdraw', withdraw);

export default router;
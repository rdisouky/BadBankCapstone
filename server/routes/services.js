import express from 'express';
import { deposit, withdraw, getBalance, transfer} from '../controllers/services.js';
const router = express.Router();

router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.post('/balance', getBalance);
router.post('/transfer', transfer);

export default router;
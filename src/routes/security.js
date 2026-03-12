import express from 'express';
import { decryptData, encryptData, getNewKeys } from '../controllers/security.js';


const router = express.Router();

router.get('/keys', getNewKeys);
router.post('/encrypt', encryptData);
router.post('/decrypt', decryptData);

export default router;
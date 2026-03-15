import express from 'express';
import { loginUser, registerUser } from "../controllers/user.js";
import { authorize, verifyToken } from '../middlewares/auth.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);

router.delete('/admin', verifyToken, authorize(['admin']), (req, res) => {
    res.json({
        message: "Admin verified: database wiped!"
    })
})

export default router;
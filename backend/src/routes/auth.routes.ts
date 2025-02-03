import { Router } from 'express';
import { registerHandler, loginHandler, verifyOTPHandler, logoutHandler } from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/verify-otp', verifyOTPHandler);
router.post('/logout', logoutHandler);

export default router;

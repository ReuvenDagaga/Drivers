import { Request, Response } from 'express';
import { registerDriver, loginDriver, logoutDriver, verifyOTP } from '../services/auth.service';

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const response = await registerDriver(req.body);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const response = await loginDriver(req.body.phoneNumber);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyOTPHandler = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, verificationCode } = req.body;
    const token = await verifyOTP(phoneNumber, verificationCode);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    const response = await logoutDriver(req.body.phoneNumber);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

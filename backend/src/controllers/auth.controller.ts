import { Request, Response } from "express";
import { registerDriver, generateAndSendOTP, verifyOTP, logout } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
    try {
        const driver = await registerDriver(req.body.nickname, req.body.carYear, req.body.carCompany, req.body.carModel, req.body.color, req.body.carImage, req.body.address, req.body.email, req.body.phoneNumber);
        res.status(201).json({ message: "Driver registered successfully", driver });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { phoneNumber } = req.body;
        await generateAndSendOTP(phoneNumber);
        res.json({ message: "OTP sent successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const verifyLoginOTP = async (req: Request, res: Response) => {
    try {
        const { phoneNumber, otp } = req.body;
        const token = await verifyOTP(phoneNumber, otp);
        res.json({ message: "Login successful", token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    try {
        const { phoneNumber } = req.body;
        await logout(phoneNumber);
        res.json({ message: "Logout successful" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

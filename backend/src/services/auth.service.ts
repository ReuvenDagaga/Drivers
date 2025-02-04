import jwt from "jsonwebtoken";
import DriverModel from "../models/Driver";
import { sendOTP } from "./OTP/infobipService";

export const registerDriver = async (nickname: string, carYear: number, carCompany: string, carModel: string, color: string, carImage: string, address: string, email: string, phoneNumber: string) => {
    let existingDriver = await DriverModel.findOne({ phoneNumber });
    if (existingDriver) throw new Error("Driver already exists");

    const driver = new DriverModel({ nickname, carYear, carCompany, carModel, color, carImage, address, email, phoneNumber });
    await driver.save();
    return driver;
};

export const generateAndSendOTP = async (phoneNumber: string) => {
    const driver = await DriverModel.findOne({ phoneNumber });
    if (!driver) throw new Error("Driver not found");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`📡 Generated OTP: ${otp}`);

    await sendOTP(phoneNumber, otp);

    driver.otp = otp;
    driver.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await driver.save();
};

export const verifyOTP = async (phoneNumber: string, otp: string) => {
    const driver = await DriverModel.findOne({ phoneNumber });
    if (!driver) throw new Error("Driver not found");

    if (!driver.otp || driver.otp !== otp || (driver.otpExpires && driver.otpExpires < new Date())) {
        throw new Error("Invalid or expired OTP");
    }

    // יצירת JWT Token
    const token = jwt.sign({ id: driver._id, phoneNumber: driver.phoneNumber }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    // ניקוי ה-OTP מהמסד לאחר השימוש
    driver.otp = undefined;
    driver.otpExpires = undefined;
    await driver.save();

    return token;
};

export const logout = async (phoneNumber: string) => {
    const driver = await DriverModel.findOne({ phoneNumber });
    if (!driver) throw new Error("Driver not found");

    // ניקוי ה-OTP לאחר התנתקות
    driver.otp = undefined;
    driver.otpExpires = undefined;
    await driver.save();
};

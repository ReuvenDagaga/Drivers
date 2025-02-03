import admin from '../config/firebase';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Driver from '../models/Driver';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'RANDOMREUVEN';

export const sendOTP = async (phoneNumber: string) => {
    try {
      const user = await admin.auth().getUserByPhoneNumber(phoneNumber);
      if (!user) {
        throw new Error('User not found');
      }
  
      const customToken = await admin.auth().createCustomToken(user.uid);

      return { message: 'OTP sent successfully', customToken };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send OTP');
    }
  };
  

export const verifyOTP = async (phoneNumber: string, verificationCode: string) => {
  const user = await admin.auth().getUserByPhoneNumber(phoneNumber).catch(() => null);

  if (!user) {
    throw new Error('User not found');
  }

  const token = jwt.sign({ uid: user.uid, phoneNumber }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};

export const registerDriver = async (data: any) => {
    const { phone } = data;
  
    const existingDriver = await Driver.findOne({ phone });
    if (existingDriver) throw new Error('Driver already exists');
  
    const userRecord = await admin.auth().createUser({ phoneNumber: phone }).catch(() => null);
    
    if (!userRecord) {
      throw new Error('Failed to create user in Firebase');
    }
  
    const driver = new Driver({ ...data, uid: userRecord.uid });
    await driver.save();
  
    return { message: 'User registered successfully. OTP sent.' };
  };


export const loginDriver = async (phoneNumber: string) => {
  const existingDriver = await Driver.findOne({ phone: phoneNumber });
  if (!existingDriver) throw new Error('Driver not found');

  return sendOTP(phoneNumber);
};

export const logoutDriver = async (phoneNumber: string) => {
  return { message: 'Logged out successfully' };
};

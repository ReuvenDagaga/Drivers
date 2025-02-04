import Driver, { IDriver } from "../models/Driver";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const getAllDrivers = async (): Promise<IDriver[]> => {
  return Driver.find();
};

export const getDriverById = async (
  driverId: string
): Promise<IDriver | null> => {
  return Driver.findById(driverId);
};

export const updateDriver = async (
  driverId: string,
  data: Partial<IDriver>
): Promise<IDriver | null> => {
  return Driver.findByIdAndUpdate(driverId, data, { new: true });
};

export const deleteDriver = async (
  driverId: string
): Promise<IDriver | null> => {
  return Driver.findByIdAndDelete(driverId);
};

export const createDriverHandlerService = async (
  data: Partial<IDriver>
): Promise<IDriver> => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return new Driver(data).save();
};



const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // עדיף לאחסן ב-ENV

export const loginDriverHandlerService = async (
  phoneNumber: string,
  password: string
): Promise<{ token: string } | null> => {
  const driver = await Driver.findOne({ phoneNumber });
  if (!driver) {
    throw new Error('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, driver.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: driver._id, phoneNumber: driver.phoneNumber }, JWT_SECRET, {
    expiresIn: '7d',
  });
  
  return { token };
};


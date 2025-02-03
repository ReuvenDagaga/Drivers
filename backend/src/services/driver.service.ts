import Driver, { IDriver } from '../models/Driver';

export const getAllDrivers = async (): Promise<IDriver[]> => {
  return Driver.find();
};

export const getDriverById = async (driverId: string): Promise<IDriver | null> => {
  return Driver.findById(driverId);
};

export const updateDriver = async (driverId: string, data: Partial<IDriver>): Promise<IDriver | null> => {
  return Driver.findByIdAndUpdate(driverId, data, { new: true });
};

export const deleteDriver = async (driverId: string): Promise<IDriver | null> => {
  return Driver.findByIdAndDelete(driverId);
};

import Passenger, { IPassenger } from '../models/Passenger';

export const createPassenger = async (data: Partial<IPassenger>): Promise<IPassenger> => {
  return new Passenger(data).save();
};

export const getAllPassengers = async (): Promise<IPassenger[]> => {
  return Passenger.find();
};

export const getPassengerById = async (passengerId: string): Promise<IPassenger | null> => {
  return Passenger.findById(passengerId);
};

export const updatePassenger = async (passengerId: string, data: Partial<IPassenger>): Promise<IPassenger | null> => {
  return Passenger.findByIdAndUpdate(passengerId, data, { new: true });
};

export const deletePassenger = async (passengerId: string): Promise<IPassenger | null> => {
  return Passenger.findByIdAndDelete(passengerId);
};

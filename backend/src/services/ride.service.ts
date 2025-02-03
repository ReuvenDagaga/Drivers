import Ride, { IRide } from '../models/Ride';

export const createRide = async (data: Partial<IRide>): Promise<IRide> => {
  return new Ride(data).save();
};

export const getAllRides = async (): Promise<IRide[]> => {
  return Ride.find();
};

export const getRideById = async (rideId: string): Promise<IRide | null> => {
  return Ride.findById(rideId);
};

export const updateRide = async (rideId: string, data: Partial<IRide>): Promise<IRide | null> => {
  return Ride.findByIdAndUpdate(rideId, data, { new: true });
};

export const deleteRide = async (rideId: string): Promise<IRide | null> => {
  return Ride.findByIdAndDelete(rideId);
};


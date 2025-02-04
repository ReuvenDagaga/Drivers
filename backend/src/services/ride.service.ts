import Ride, { IRide } from '../models/Ride';
import mongoose from 'mongoose';
import ClosedRide from '../models/ClosedRide';


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


export const findClosestRides = async (longitude: number, latitude: number) => {
    return await Ride.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [longitude, latitude] },
          distanceField: 'distance',
          spherical: true
        }
      },
      { $sort: { distance: 1 } }, 
      {
        $project: {
          _id: 1,
          originAddress: '$origin.address',
          destinationAddress: '$destination.address',
          distance: 1,
          passengers: 1,
          price: 1,
          specialRequests: 1
        }
      }
    ]);
  };


  export const findHighestPricedRides = async () => {
    return await Ride.find({})
      .sort({ price: -1 }) 
      .limit(10) 
      .select('_id origin.address destination.address price passengers specialRequests');
  };
  

export const takeRideService = async (driverId: string, rideId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const ride = await Ride.findById(rideId).session(session);
    if (!ride) {
      throw new Error('Ride not found or already taken');
    }

    const closedRide = new ClosedRide({
      ride: ride._id,
      driver: driverId
    });

    await closedRide.save({ session });

    await Ride.findByIdAndDelete(ride._id, { session });

    await session.commitTransaction();
    session.endSession();

    return { success: true, message: 'Ride successfully taken' };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error.message);
  }
};

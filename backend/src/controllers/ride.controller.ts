import { Request, Response } from 'express';
import { createRide, getAllRides, getRideById, updateRide, deleteRide, takeRideService } from '../services/ride.service';
import { findClosestRides, findHighestPricedRides } from '../services/ride.service';

export const getClosestRides = async (req: Request, res: Response) => {
  try {
    const { longitude, latitude } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({ error: 'Longitude and latitude are required' });
    }

    const rides = await findClosestRides(parseFloat(longitude as string), parseFloat(latitude as string));
    res.status(200).json(rides);
  } catch (error) {
    console.error('Error fetching closest rides:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getHighestPricedRides = async (_req: Request, res: Response) => {
  try {
    const rides = await findHighestPricedRides();
    res.status(200).json(rides);
  } catch (error) {
    console.error('Error fetching highest priced rides:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const createRideHandler = async (req: Request, res: Response) => {
  try {
    const ride = await createRide(req.body);
    res.status(201).json(ride);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllRidesHandler = async (req: Request, res: Response) => {
  try {
    const rides = await getAllRides();
    res.status(200).json(rides);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRideByIdHandler = async (req: Request, res: Response) => {
  try {
    const ride = await getRideById(req.params.id);
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    res.status(200).json(ride);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRideHandler = async (req: Request, res: Response) => {
  try {
    const ride = await updateRide(req.params.id, req.body);
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    res.status(200).json(ride);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRideHandler = async (req: Request, res: Response) => {
  try {
    const ride = await deleteRide(req.params.id);
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    res.status(200).json({ message: 'Ride deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const takeRide = async (req: Request, res: Response) => {
    try {
      const { driverId, rideId } = req.body;
  
      if (!driverId || !rideId) {
        return res.status(400).json({ error: 'Driver ID and Ride ID are required' });
      }
  
      const result = await takeRideService(driverId, rideId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

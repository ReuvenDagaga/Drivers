import { Request, Response } from 'express';
import { createRide, getAllRides, getRideById, updateRide, deleteRide } from '../services/ride.service';

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

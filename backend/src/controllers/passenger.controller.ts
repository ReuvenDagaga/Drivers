import { Request, Response } from 'express';
import { createPassenger, getAllPassengers, getPassengerById, updatePassenger, deletePassenger } from '../services/passenger.service';

export const createPassengerHandler = async (req: Request, res: Response) => {
  try {
    const passenger = await createPassenger(req.body);
    res.status(201).json(passenger);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPassengersHandler = async (req: Request, res: Response) => {
  try {
    const passengers = await getAllPassengers();
    res.status(200).json(passengers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPassengerByIdHandler = async (req: Request, res: Response) => {
  try {
    const passenger = await getPassengerById(req.params.id);
    if (!passenger) return res.status(404).json({ error: 'Passenger not found' });
    res.status(200).json(passenger);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePassengerHandler = async (req: Request, res: Response) => {
  try {
    const passenger = await updatePassenger(req.params.id, req.body);
    if (!passenger) return res.status(404).json({ error: 'Passenger not found' });
    res.status(200).json(passenger);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePassengerHandler = async (req: Request, res: Response) => {
  try {
    const passenger = await deletePassenger(req.params.id);
    if (!passenger) return res.status(404).json({ error: 'Passenger not found' });
    res.status(200).json({ message: 'Passenger deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

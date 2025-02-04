import { Request, Response } from 'express';
import { getAllDrivers, getDriverById, updateDriver, deleteDriver, createDriverHandlerService, loginDriverHandlerService} from '../services/driver.service';


export const getAllDriversHandler = async (req: Request, res: Response) => {
  try {
    const drivers = await getAllDrivers();
    res.status(200).json(drivers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getDriverByIdHandler = async (req: Request, res: Response) => {
  try {
    const driver = await getDriverById(req.params.id);
    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.status(200).json(driver);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDriverHandler = async (req: Request, res: Response) => {
  try {
    const driver = await updateDriver(req.params.id, req.body);
    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.status(200).json(driver);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDriverHandler = async (req: Request, res: Response) => {
  try {
    const driver = await deleteDriver(req.params.id);
    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.status(200).json({ message: 'Driver deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createDriverHandler = async (req: Request, res: Response) => {
      try {
        if (!req.body) 
        return res.status(400).json({ error: 'Invalid request' });
        const passenger = await createDriverHandlerService(req.body);
        res.status(201).json(passenger);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
}

export const loginDriverHandler = async (req: Request, res: Response) => {
  try {
    if (!req.body) 
    return res.status(400).json({ error: 'Invalid request' });
    const { phoneNumber, password } = req.body;
    const driver = await loginDriverHandlerService(phoneNumber, password);
    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.cookie('token', driver.token, { httpOnly: true });
    res.status(200).json(driver);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

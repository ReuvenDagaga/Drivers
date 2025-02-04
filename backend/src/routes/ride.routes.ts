import { Router } from 'express';
import { createRideHandler, getAllRidesHandler, getRideByIdHandler, updateRideHandler, deleteRideHandler, getClosestRides, getHighestPricedRides, takeRide } from '../controllers/ride.controller';

const router = Router();

router.post('/take', takeRide);
router.get('/closest', getClosestRides); 
router.get('/highest-price', getHighestPricedRides); 
router.post('/', createRideHandler);
router.get('/', getAllRidesHandler);
router.get('/:id', getRideByIdHandler);
router.put('/:id', updateRideHandler);
router.delete('/:id', deleteRideHandler);

export default router;

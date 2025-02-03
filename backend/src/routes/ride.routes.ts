import { Router } from 'express';
import { createRideHandler, getAllRidesHandler, getRideByIdHandler, updateRideHandler, deleteRideHandler } from '../controllers/ride.controller';

const router = Router();

router.post('/', createRideHandler);
router.get('/', getAllRidesHandler);
router.get('/:id', getRideByIdHandler);
router.put('/:id', updateRideHandler);
router.delete('/:id', deleteRideHandler);

export default router;

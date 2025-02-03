import { Router } from 'express';
import { createPassengerHandler, getAllPassengersHandler, getPassengerByIdHandler, updatePassengerHandler, deletePassengerHandler } from '../controllers/passenger.controller';

const router = Router();

router.post('/', createPassengerHandler);
router.get('/', getAllPassengersHandler);
router.get('/:id', getPassengerByIdHandler);
router.put('/:id', updatePassengerHandler);
router.delete('/:id', deletePassengerHandler);

export default router;

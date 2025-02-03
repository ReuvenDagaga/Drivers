import { Router } from 'express';
import { getAllDriversHandler, getDriverByIdHandler, updateDriverHandler, deleteDriverHandler } from '../controllers/driver.controller';

const router = Router();

router.get('/', getAllDriversHandler);
router.get('/:id', getDriverByIdHandler);
router.put('/:id', updateDriverHandler);
router.delete('/:id', deleteDriverHandler);

export default router;

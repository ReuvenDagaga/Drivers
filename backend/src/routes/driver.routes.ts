import { Router } from 'express';
import { getAllDriversHandler, getDriverByIdHandler, updateDriverHandler, deleteDriverHandler, createDriverHandler, loginDriverHandler } from '../controllers/driver.controller';

const router = Router();

router.post('/login', loginDriverHandler);
router.post('/register', createDriverHandler);
router.get('/', getAllDriversHandler);
router.get('/:id', getDriverByIdHandler);
router.put('/:id', updateDriverHandler);
router.delete('/:id', deleteDriverHandler);

export default router;

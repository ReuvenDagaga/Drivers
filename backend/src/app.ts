import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import driverRoutes from './routes/driver.routes';
import passengerRoutes from './routes/passenger.routes';
import rideRoutes from './routes/ride.routes';
import authRoutes from './routes/auth.routes';

const app: Application = express();

app.use(cors()); 
app.use(helmet());
app.use(morgan('dev')); 
app.use(express.json()); 


app.use('/api/auth', authRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/passengers', passengerRoutes);
app.use('/api/rides', rideRoutes);


app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;

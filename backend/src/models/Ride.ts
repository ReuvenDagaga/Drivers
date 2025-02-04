import mongoose, { Schema, Document } from 'mongoose';

export interface IRide extends Document {
  origin: {
    address: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  destination: {
    address: string;
    coordinates: [number, number];
  };
  passengers: number;
  specialRequests?: string;
  price: number;
  createdBy: mongoose.Types.ObjectId;
}

const RideSchema: Schema = new Schema({
  origin: {
    address: { type: String, required: true },
    coordinates: { type: [Number], required: true, index: '2dsphere' }
  },
  destination: {
    address: { type: String, required: true },
    coordinates: { type: [Number], required: true }
  },
  passengers: { type: Number, required: true },
  specialRequests: { type: String, default: '' },
  price: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Passenger', required: true }
});

export default mongoose.model<IRide>('Ride', RideSchema);

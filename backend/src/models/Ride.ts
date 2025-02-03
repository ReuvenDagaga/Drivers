import mongoose, { Schema, Document } from 'mongoose';

export interface IRide extends Document {
  origin: string;
  destination: string;
  passengers: number;
  specialRequests: string;
  price: number;
  createdBy: mongoose.Types.ObjectId;
}

const RideSchema: Schema = new Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  passengers: { type: Number, required: true },
  specialRequests: { type: String },
  price: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Passenger', required: true }
});

export default mongoose.model<IRide>('Ride', RideSchema);

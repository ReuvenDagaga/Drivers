import mongoose, { Schema, Document } from 'mongoose';

export interface IPassenger extends Document {
  name: string;
  address: string;
  travelHistory: string[];
  preferences: string[];
}

const PassengerSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  travelHistory: { type: [String], default: [] },
  preferences: { type: [String], default: [] }
});

export default mongoose.model<IPassenger>('Passenger', PassengerSchema);

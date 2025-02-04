import mongoose, { Schema, Document } from 'mongoose';

export interface IDriver extends Document {
  nickname: string;
  carYear: number;
  carCompany: string;
  carModel: string;
  color: string;
  carImage?: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const DriverSchema: Schema = new Schema({
  nickname: { type: String, required: true },
  carYear: { type: Number, required: true },
  carCompany: { type: String, required: true },
  carModel: { type: String, required: true },
  color: { type: String, required: true },
  carImage: { type: String, required: false },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IDriver>('Driver', DriverSchema);

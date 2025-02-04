import mongoose, { Schema, Document } from 'mongoose';

export interface IClosedRide extends Document {
  ride: mongoose.Types.ObjectId; // רפרנס לנסיעה המקורית
  driver: mongoose.Types.ObjectId; // רפרנס לנהג שלקח את הנסיעה
  takenAt: Date; // מתי הנסיעה נלקחה
  completedAt?: Date; // מתי הנסיעה הושלמה (אם רלוונטי)
}

const ClosedRideSchema: Schema = new Schema({
  ride: { type: Schema.Types.ObjectId, ref: 'Ride', required: true, unique: true },
  driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  takenAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

export default mongoose.model<IClosedRide>('ClosedRide', ClosedRideSchema);

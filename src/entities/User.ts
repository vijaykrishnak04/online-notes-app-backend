import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  roles: string[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  roles: { 
    type: [String], 
    default: ['user']
  }
});

export const User = mongoose.model<IUser>('User', UserSchema);


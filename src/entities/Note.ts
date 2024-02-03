import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import { IUser } from './User';

export interface INote extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser['_id']; 
}

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export const Note = mongoose.model<INote>('Note', NoteSchema);

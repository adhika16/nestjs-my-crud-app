/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
});

export interface ITask extends mongoose.Document {
  title: string;
  description: string;
  done: boolean;
  }

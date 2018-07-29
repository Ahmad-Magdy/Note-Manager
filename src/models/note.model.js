import { Schema, model } from 'mongoose';

const noteSchema = new Schema({
  content: {
    required: true,
    type: String,
  },
  attachedFiles: {
    type: [String],
  },
  scheduleTime: {
    type: Date,
    default: new Date(),
  },
  state: {
    type: Number,
    default: 1,
  },
});

const Note = model('note', noteSchema);
export default Note;

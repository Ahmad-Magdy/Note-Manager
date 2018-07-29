import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
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

const Note = mongoose.model('note', noteSchema);
export default Note;

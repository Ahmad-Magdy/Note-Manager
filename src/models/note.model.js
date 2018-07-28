const mongoose = require('mongoose');

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
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

const Note = mongoose.model('note', noteSchema);
export default Note;

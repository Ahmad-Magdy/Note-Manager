const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    required: true,
    type: String,
  },
  attachedFiles: {
    type: [String],
  },
  remindTime: {
    type: Date,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('note', noteSchema);

import { Note } from '../models';

const createNewNote = newNote => Note.create(newNote);

const getSingleNote = noteId => Note.findById(noteId).exec();

const deleteSingleNote = noteId => Note.findByIdAndRemove(noteId).exec();

const getAllNotes = () => Note.find({}).exec();

const getScheduledNotes = () => Note
  .find({ scheduleTime: { $lt: new Date() }, isDone: false })
  .exec();

const editSingleNote = ({ id, ...noteWithEdits }) => Note
  .findByIdAndUpdate(id, noteWithEdits)
  .exec();

export {
  createNewNote,
  getSingleNote,
  deleteSingleNote,
  getAllNotes,
  getScheduledNotes,
  editSingleNote,
};

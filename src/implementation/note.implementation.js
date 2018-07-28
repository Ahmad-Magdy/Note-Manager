import { Note } from '../models';

const createNewNote = newNote => Note.create(newNote);

const getSingleNote = noteId => Note.findById(noteId).exec();

const deleteSingleNote = noteId => Note.findByIdAndRemove(noteId).exec();

const getAllNotes = () => Note.find({}).exec();

const getScheduledNotes = () => Note
  .find({ scheduleTime: { $gt: new Date() }, state: 1 })
  .exec();

const editSingleNote = (id, noteWithEdits) => Note
  .findByIdAndUpdate(id, noteWithEdits, { new: true })
  .exec();

const changeNoteState = async (id, newState) => {
  let note = await getSingleNote(id);
  if (note.state === 1 && newState === 2) note.state = 2;
  else note.state = newState;
  note = await editSingleNote(id, note);
  return note;
};

export {
  createNewNote,
  getSingleNote,
  deleteSingleNote,
  getAllNotes,
  getScheduledNotes,
  editSingleNote,
  changeNoteState,
};

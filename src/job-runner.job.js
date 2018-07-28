import { CronJob } from 'cron';
import mongoose from 'mongoose';
import { noteOperations } from './implementation/index';
import config from './config';

mongoose.connect(config.dbCN).then(() => console.info('Connected to MongoDB'));

const job = new CronJob('0 */5 * * * *', async () => {
  console.log('You will see this message every s');
  const notes = await noteOperations.getScheduledNotes();
  notes.forEach((note) => {
    console.log(note);
    noteOperations.changeNoteState(note.id, 2);
    // You can run any function right here;
  });
}, null, true);

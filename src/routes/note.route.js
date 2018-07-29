import Router from 'koa-router';
import koaBody from 'koa-body';
import path from 'path';
import { isArray } from 'util';

import { noteOperations } from '../implementation';

const router = new Router({
  prefix: '/notes',
});

router
  .get('/', async (ctx) => {
    ctx.body = await noteOperations.getAllNotes();
    ctx.status = 200;
  })
  .post('/', koaBody({
    multipart: true,
    formLimit: 15,
    formidable: {
      uploadDir: path.join(__dirname, '..', '..', '/uploads'),
      keepExtensions: true,
    },
  }), async (ctx) => {
    let attachedFiles;
    if (!isArray(attachedFiles)) attachedFiles = [ctx.request.files.attachedFiles.path];
    else attachedFiles = ctx.request.files.attachedFiles.map(file => file.path);
    const newNote = { ...ctx.request.body, attachedFiles };
    try {
      await noteOperations.createNewNote(newNote);
      ctx.body = { success: true };
      ctx.status = 201;
    } catch (ex) {
      ctx.body = ex || 'Something went wrong';
      ctx.status = 400;
    }
  })
  .get('/scheduled', async (ctx) => {
    ctx.body = await noteOperations.getScheduledNotes();
    ctx.status = 200;
  })
  .get('/search', async (ctx) => {
    if (!ctx.request.query.content) ctx.body = [];
    else ctx.body = await noteOperations.searchInNotes(ctx.request.query.content);
    ctx.status = 200;
  })
  .put('/:id', async (ctx) => {
    const newDoc = await noteOperations.editSingleNote(ctx.params.id, ctx.request.body);
    ctx.body = newDoc;
    ctx.status = 202;
  })
  .get('/:id', async (ctx) => {
    let note;
    if (ctx.query.seen) {
      note = await noteOperations.changeNoteState(ctx.params.id, 3);
    } else {
      note = await noteOperations.getSingleNote(ctx.params.id);
    }
    ctx.body = note;
    ctx.status = 200;
  })
  .delete('/:id', async (ctx) => {
    await noteOperations.deleteSingleNote(ctx.params.id);
    ctx.status = 200;
    ctx.body = { success: true };
  })
  .post('/:id/done', async (ctx) => {
    const note = await noteOperations.changeNoteState(ctx.params.id, 4);
    ctx.body = note;
    ctx.status = 200;
  });


export default router;

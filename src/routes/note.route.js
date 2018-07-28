import Router from 'koa-router';
import { noteOperations } from '../implementation';

const router = new Router({
  prefix: '/notes',
});

router
  .get('/', (ctx) => {
    ctx.body = noteOperations.getAllNotes();
    ctx.status = 200;
  })
  .post('/', (ctx) => {
    ctx.status = 201;
  });


export default router;

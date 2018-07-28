import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { noteRoutes } from './routes';

const app = new Koa();

app.use(bodyParser());
app.use(noteRoutes.routes());

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3000, () => {
  console.log('App is Listening On PORT 3000');
});

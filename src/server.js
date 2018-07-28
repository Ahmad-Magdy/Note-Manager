import Koa from 'koa';
import koaBody from 'koa-body';
import mongoose from 'mongoose';
import { noteRoutes } from './routes';
import config from './config';

const app = new Koa();

mongoose.Promise = global.Promise;
mongoose.connect(config.dbCN).then(() => console.info('Connected to MongoDB'));

app.use(koaBody());
app.use(noteRoutes.routes());

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3000, () => {
  console.log('App is Listening On PORT 3000');
});

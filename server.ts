import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import initRoutes from './todo/todo.routes';
import { ResponseModel } from './models/response.model';

const app = express();
const port = 3010;
mongoose.Promise = global.Promise;

const options: cors.CorsOptions = {
  origin: ['http://localhost:3310', 'http://localhost:3320'],
};

app.use(cors(options));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(
    'mongodb://root:rootpassword@node-todolist-api_devcontainer_mongodb_1:27017',
        {
          useNewUrlParser: true,
        } as ConnectOptions
  )
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.log('Could not connect to the database. Error...', err);
    process.exit();
  });

initRoutes(app);

app.get('/heartbeat', (
  req: express.Request,
  res: express.Response<ResponseModel>) => {
  res.send({
    success: true,
    payload: 'Service is up.',
    error: '',
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

import { create, update, remove, findAll, findOne, findAllIncomplete } from './todo.controller';

const initRoutes = (app) => {
  app.post('/todo', create);
  app.get('/todo/:id', findOne);
  app.get('/todo', findAll);
  // For experimenting with filter
  app.get('/todo-incomplete', findAllIncomplete);
  app.put('/todo/:id', update);
  app.delete('/todo/:id', remove);
};

export default initRoutes;

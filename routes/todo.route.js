import { create, getAll, getDetail, remove, update } from "../handlers/todo.handler.js";

const routes = async (app, options) => {
  app.route({
    method: 'POST',
    url: '/api/todo',
    handler: create
  });

  app.route({
    method: 'GET',
    url: '/api/todo',
    handler: getAll
  });

  app.route({
    method: 'GET',
    url: '/api/todo/:id',
    handler: getDetail
  });

  app.route({
    method: 'PUT',
    url: '/api/todo/:id',
    handler: update
  });

  app.route({
    method: 'DELETE',
    url: '/api/todo/:id',
    handler: remove
  });

};

export default routes;
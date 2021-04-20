import express from "express";

import UsersController from "./controllers/UsersController";
const userController = new UsersController();

const routes = express.Router();

routes.get('/', (request, response) => {
    response.send('Invalid Route: Access the Correct Route <a href="http://localhost:81">Here</a>');
});

routes.get('/userjson', userController.index);

routes.get('/usertsql', userController.userTSql);

export default routes;
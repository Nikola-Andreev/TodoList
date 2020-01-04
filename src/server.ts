import * as http from "http";
import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import App from "./app";
// Routes
import UsersRouter from "./routes/users.routes";
import ListsRouter from "./routes/lists.routes";
// Controllers
import UsersController from "./controllers/users.controller";
import ListsController from "./controllers/lists.controller";
// Services
import UsersService from "./services/users.service";
import ListsService from "./services/lists.service";
// Configurations
import JWT from "./configurations/jwt.configuration";

const userService: UsersService = new UsersService();
const listsService: ListsService = new ListsService();

const jwt: JWT = new JWT(userService);

const usersController: UsersController = new UsersController(userService, jwt);
const listsController: ListsController = new ListsController(listsService);

const usersRouter: UsersRouter = new UsersRouter(usersController);
const listsRouter: ListsRouter = new ListsRouter(listsController);

const app: express.Application = (new App(usersRouter, listsRouter, jwt)).app;

app.set("port",  process.env.APP_PORT);

const server = http.createServer(app);
server.listen(process.env.APP_PORT, () => {
    console.log(`Server listening at port: ${process.env.APP_PORT}`);
});

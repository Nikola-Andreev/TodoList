import * as http from "http";
import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import App from "./app";
// Routes
import UsersRouter from "./routes/users.routes";
import ListsRouter from "./routes/lists.routes";
import ItemsRouter from "./routes/items.routes";
// Controllers
import UsersController from "./controllers/users.controller";
import ListsController from "./controllers/lists.controller";
import ItemsController from "./controllers/items.controller";
// Services
import UsersService from "./services/users.service";
import ListsService from "./services/lists.service";
import ItemsService from "./services/items.service";
// Middleware
import JWT from "./middlewares/jwt.middleware";
import AuthorizationMiddleware from "./middlewares/authorization.middleware";

const userService: UsersService = new UsersService();
const listsService: ListsService = new ListsService();
const itemsService: ItemsService = new ItemsService();

const jwt: JWT = new JWT(userService);
const authorizationMiddleware: AuthorizationMiddleware = new AuthorizationMiddleware(listsService);

const usersController: UsersController = new UsersController(userService, jwt);
const listsController: ListsController = new ListsController(listsService);
const itemsController: ItemsController = new ItemsController(itemsService, listsService);

const usersRouter: UsersRouter = new UsersRouter(usersController);
const listsRouter: ListsRouter = new ListsRouter(listsController);
const itemsRouter: ItemsRouter = new ItemsRouter(itemsController);

const app: express.Application = (new App(usersRouter, listsRouter, itemsRouter, jwt, authorizationMiddleware)).app;

app.set("port",  process.env.APP_PORT);

const server = http.createServer(app);
server.listen(process.env.APP_PORT, () => {
    console.log(`Server listening at port: ${process.env.APP_PORT}`);
});

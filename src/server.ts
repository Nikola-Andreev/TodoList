import * as http from "http";
import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import App from "./app";
// Routes
import UsersRouter from "./routes/users.routes"
// Controllers
import UsersController from "./controllers/users.controller"
// Services
import UsersService from "./services/users.service";
// Configurations
import JWT from "./configurations/jwt.configuration";

const userService: UsersService = new UsersService();

const jwt: JWT = new JWT(userService);

const usersController: UsersController = new UsersController(userService, jwt);

const usersRouter: UsersRouter = new UsersRouter(usersController);

const app: express.Application = (new App(usersRouter, jwt)).app;

app.set("port",  process.env.APP_PORT);

const server = http.createServer(app);
server.listen(process.env.APP_PORT, () => {
    console.log(`Server listening at port: ${process.env.APP_PORT}`);
});

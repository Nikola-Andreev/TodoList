import * as http from "http";
import * as express from "express";
import App from "./app";
// Routes
import ProductsRouter from "./routes/products.routes";
import UsersRouter from "./routes/users.routes"
import OrdersRouter from "./routes/orders.routes"
// Controllers
import UsersController from "./controllers/users.controller"
import ProductsController from "./controllers/products.controller";
import OrdersController from "./controllers/orders.controller";
// Services
import ProductsService from "./services/products.service";
import OrdersService from "./services/orders.service";
import UsersService from "./services/users.service";
import VatService from "./services/vat.service";
// Adapters
import ProductsAdapter from "./adapters/products.adapter"
import JWT from "./configurations/jwt.configuration";

const productsService: ProductsService = new ProductsService();
const ordersService: OrdersService = new OrdersService();
const userService: UsersService = new UsersService();
const vatService: VatService = new VatService()

const productsAdapter: ProductsAdapter = new ProductsAdapter(vatService);

const jwt: JWT = new JWT(userService);

const employeesController: ProductsController = new ProductsController(productsService, productsAdapter);
const usersController: UsersController = new UsersController(userService, jwt);
const ordersController: OrdersController = new OrdersController(ordersService);

const usersRouter: UsersRouter = new UsersRouter(usersController);
const productsRouter: ProductsRouter = new ProductsRouter(employeesController);
const ordersRouter: OrdersRouter = new OrdersRouter(ordersController);

const app: express.Application = (new App(usersRouter, productsRouter, ordersRouter, jwt)).app;

const port = 3000;
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});

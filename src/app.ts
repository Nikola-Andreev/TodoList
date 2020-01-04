import { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as passport from "passport";
import UsersRouter from "./routes/users.routes";
import ListsRouter from "./routes/lists.routes";
import JWT from "./configurations/jwt.configuration";

export default class App {

    private readonly _app: express.Application;
    private readonly _usersRouter: UsersRouter;
    private readonly _listsRouter: ListsRouter;
    private readonly _jwt: JWT;

    constructor(usersRouter: UsersRouter, listsRouter: ListsRouter, jwt: JWT) {
        this._usersRouter = usersRouter;
        this._listsRouter = listsRouter;
        this._jwt = jwt;
        this._app = express();
        this._initMiddleware();
        this._initRoutes();
    }

    public get app(): express.Application {
        return this._app;
    }

    private _initMiddleware(): void {

        this._app.use((req: Request, res: Response, next: NextFunction) => {

            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS, PATCH");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
            );
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });

        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: false }));
        this._app.use(passport.initialize());
        this._app.use(passport.session());
        this._jwt.configAuth(passport);
    }

    private _initRoutes(): void {
        this._app.use("/api/v1.0.0/users", this._usersRouter.router);
        this._app.use("/api/v1.0.0/lists", this._listsRouter.router);
    }
}

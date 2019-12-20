import * as passport from "passport";
import { Router } from "express";
import UsersController from "../controllers/users.controller";

export default class UsersRouter {

    private readonly _usersController: UsersController;
    private readonly _router: Router;

    constructor(usersController: UsersController) {
        this._usersController = usersController;
        this._router = Router();
        this._init();
    }

    public get router(): Router {
        return this._router;
    }

    private _init(): void {
        this._router.get("/", (req, res, next) => this._usersController.getUserById(req, res, next)); // TODO remove
        this._router.post("/login", (req, res, next) => this._usersController.login(req, res, next));
    }
}
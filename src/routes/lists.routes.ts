import * as passport from "passport";
import { Router } from "express";
import ListsController from "../controllers/lists.controller";

export default class ListsRouter {

    private readonly _listsController: ListsController;
    private readonly _router: Router;

    constructor(listsController: ListsController) {
        this._listsController = listsController;
        this._router = Router();
        this._init();
    }

    public get router(): Router {
        return this._router;
    }

    private _init(): void {
        this._router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => this._listsController.getAllUserLists(req, res, next));
    }
}
import { Router } from "express";
import ItemsController from "../controllers/items.controller";
import ValidationMiddleware from "../middlewares/validation.middleware";

export default class ItemsRouter {

    private readonly _itemsController: ItemsController;
    private readonly _validationMiddleware: ValidationMiddleware;
    private readonly _router: Router;

    constructor(itemsController: ItemsController, validationMiddleware: ValidationMiddleware) {
        this._itemsController = itemsController;
        this._validationMiddleware = validationMiddleware;
        this._router = Router({mergeParams: true});
        this._init();
    }

    public get router(): Router {
        return this._router;
    }

    private _init(): void {
        this._router.get("/", (req, res, next) => this._itemsController.getAllListItems(req, res, next));
        this._router.post("/",
            (req, res, next) => this._validationMiddleware.validateListItem(req, res, next),
            (req, res, next) => this._itemsController.addListItem(req, res, next));
        this._router.put("/:itemId",
            (req, res, next) => this._validationMiddleware.validateListItem(req, res, next),
            (req, res, next) => this._itemsController.editListItem(req, res, next));
        this._router.delete("/:itemId", (req, res, next) => this._itemsController.deleteListItem(req, res, next));
    }
}

import { Router } from "express";
import ItemsController from "../controllers/items.controller";

export default class ItemsRouter {

    private readonly _itemsController: ItemsController;
    private readonly _router: Router;

    constructor(itemsController: ItemsController) {
        this._itemsController = itemsController;
        this._router = Router({mergeParams: true});
        this._init();
    }

    public get router(): Router {
        return this._router;
    }

    private _init(): void {
        this._router.post("/", (req, res, next) => this._itemsController.addListItem(req, res, next));
        this._router.put("/:itemId", (req, res, next) => this._itemsController.editListItem(req, res, next));
        this._router.delete("/:itemId", (req, res, next) => this._itemsController.deleteListItem(req, res, next));
    }
}

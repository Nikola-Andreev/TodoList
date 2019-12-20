import * as passport from "passport";
import { Router } from "express";
import ProductsController from "../controllers/products.controller";

export default class ProductsRouter {

    private readonly _productsController: ProductsController;
    private readonly _router: Router;

    constructor(productsController: ProductsController) {
        this._productsController = productsController;
        this._router = Router();
        this._init();
    }

    public get router(): Router {
        return this._router;
    }

    private _init(): void {
        this._router.get("/", (req, res, next) => this._productsController.getAllProducts(req, res, next));
        this._router.post("/", passport.authenticate("jwt", { session: false }), (req, res, next) => this._productsController.addProduct(req, res, next));
        this._router.put("/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => this._productsController.editProduct(req, res, next));
        this._router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => this._productsController.deleteProduct(req, res, next));
    }

}
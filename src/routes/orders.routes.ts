import * as passport from "passport";
import { Router } from "express";
import OrdersController from "../controllers/orders.controller";

export default class OrdersRouter {

    private readonly _ordersController: OrdersController;
    private readonly _router: Router;

    constructor(ordersController: OrdersController) {
        this._ordersController = ordersController;
        this._router = Router();
        this._init();
    }

    public get router(): Router {
        return this._router;
    }

    private _init(): void {
        this._router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => this._ordersController.getAllOrders(req, res, next));
        this._router.post("/", passport.authenticate("jwt", { session: false }), (req, res, next) => this._ordersController.addOrder(req, res, next));
        this._router.put("/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => this._ordersController.editOrder(req, res, next));
    }
}
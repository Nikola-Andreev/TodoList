import * as attempt from "@assertchris/attempt-promise";
import {NextFunction, Request, Response} from "express";
import OrdersService from "../services/orders.service";
import OrdersAdapter from "../adapters/orders.adapter";
import RequestStatus from "../enums/RequestStatus";

export default class OrdersController {

    private readonly _ordersService: OrdersService;
    private readonly _ordersAdapter: OrdersAdapter;

    constructor(ordersService: OrdersService, ordersAdapter: OrdersAdapter) {
        this._ordersService = ordersService;
        this._ordersAdapter = ordersAdapter;
    }

    async getAllOrders(req: Request, res: Response, next: NextFunction) {
        const [err, orders] = await attempt(this._ordersService.getAllOrders());
        if(err) {
            res.status(RequestStatus.SERVER_ERROR).send(err.message);
            return;
        };
        res.status(RequestStatus.OK).send(this._ordersAdapter.prepareResponse(JSON.parse(orders)));
    }

    async addOrder(req: Request, res: Response, next: NextFunction) {
        const [err, order] =  await attempt(this._ordersService.addOrder(req.body))
        if(err) {
            res.status(RequestStatus.SERVER_ERROR).send(err.message);
            return;
        };
        const responseProduct = this._ordersAdapter.prepareResponse([order]);
        res.status(RequestStatus.CREATED).send(responseProduct);
    }

    async editOrder(req: Request, res: Response, next: NextFunction) {
        const orderId: string = req.params.id;
        const [getErr, currentOrder] =  await attempt(this._ordersService.getOrderById(orderId));
        if(getErr) {
            res.status(RequestStatus.SERVER_ERROR).send(getErr.message);
            return;
        } else if (!currentOrder) {
            res.status(RequestStatus.NOT_FOUND).send("Order not found");
            return;
        }
        const updateData = this._ordersAdapter.updateStatus(JSON.parse(currentOrder), req.body);
        const [udateErr, updatedOrder] = await attempt(this._ordersService.editOrder(updateData, req.params.id));
        if(udateErr) {
            res.status(RequestStatus.SERVER_ERROR).send(udateErr.message);
            return;
        } 
        const responseProduct = this._ordersAdapter.prepareResponse([updatedOrder]);
        res.status(RequestStatus.OK).send(responseProduct);
    }
}

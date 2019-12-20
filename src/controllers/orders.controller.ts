import {NextFunction, Request, Response} from 'express';
import OrdersService from "../services/orders.service";
import { createWriteStream } from 'fs';

export default class OrdersController {

    private readonly _ordersService: OrdersService;

    constructor(ordersService: OrdersService) {
        this._ordersService = ordersService;
    }

    async getAllOrders(req: Request, res: Response, next: NextFunction) {
        const orders: any = await this._ordersService.getAllOrders().catch((err) => {
            res.status(500).send(err.message);
        });
        if(!orders) return; 
        res.status(200).send(orders); // this._productsAdapter.prepareResponse(JSON.parse(products))
    }

    async addOrder(req: Request, res: Response, next: NextFunction) {
        const order: any = await this._ordersService.addOrder(req.body).catch(err => {
            res.status(500).send(err.message);
        });
        console.log(order)
        if(!order) return; 
        // const responseProduct = this._productsAdapter.prepareResponse([product], countryCode);
        res.status(200).send(order);
    }

    async editOrder(req: Request, res: Response, next: NextFunction) {
        const orderId: string = req.params.id;
        let responseSend = false;
        const currentOrder = await this._ordersService.getOrderById(orderId).catch(err => {
            res.status(500).send(err.message);
            responseSend = true;
        });
        if (!currentOrder && !responseSend) {
            res.status(404).send("Order not fownd");
            return;
        }
        // const updateData = this._productsAdapter.mergeObjects(JSON.parse(currentProduct), req.body);
        const updatedOrder: any = await this._ordersService.editOrder(currentOrder, req.params.id).catch(err => {
            res.status(500).send(err.message);
        });
        if(!updatedOrder) return;
        // const responseProduct = this._productsAdapter.prepareResponse([updatedProduct], countryCode);
        res.status(200).send(updatedOrder);
    }

    async deleteOrder(req: Request, res: Response, next: NextFunction) {
        let responseSend = false;
        await this._ordersService.deleteOrder(req.params.id).catch(err => {
            res.status(500).send(err.message);
            responseSend = true;
        });
        if(responseSend) return;
        res.status(200).send();
    }
}

import * as attempt from "@assertchris/attempt-promise";
import {NextFunction, Request, Response} from "express";
import ItemsService from "../services/items.service";
import ListsService from "../services/lists.service";
import RequestStatus from "../enums/RequestStatus";

export default class ItemsController {

    private readonly _itemsService: ItemsService;
    private readonly _listsService: ListsService;

    constructor(itemsService: ItemsService, listsService: ListsService) {
        this._itemsService = itemsService;
        this._listsService = listsService;
    }

    async addListItem(req: Request, res: Response, next: NextFunction) {
        const [errAddItem, item] = await attempt(this._itemsService.addListItem(req.body, req.params.listId));
        if(errAddItem) {
            res.status(RequestStatus.SERVER_ERROR).send(errAddItem.message || errAddItem.description);
            return;
        }
        res.status(RequestStatus.OK).send(item);
    }

    async editListItem(req: Request, res: Response, next: NextFunction) {
        const [errEditItem, item] = await attempt(this._itemsService.editListItem(req.body, req.params.itemId));
        if(errEditItem) {
            res.status(RequestStatus.SERVER_ERROR).send(errEditItem.message || errEditItem.description);
            return;
        }
        res.status(RequestStatus.OK).send(item);
    }

    async deleteListItem(req: Request, res: Response, next: NextFunction) {
        const [errDeleteItem, item] = await attempt(this._itemsService.deleteListItem(req.params.itemId));
        if (errDeleteItem) {
            res.status(RequestStatus.SERVER_ERROR).send(errDeleteItem.message || errDeleteItem.description);
            return;
        }
        res.status(RequestStatus.OK).send(item);
    }
}

import * as attempt from "@assertchris/attempt-promise";
import {NextFunction, Request, Response} from "express";
import ItemsService from "../services/items.service";
import ListsService from "../services/lists.service";
import RequestStatus from "../enums/RequestStatus";
import ItemsAdapter from "../adapters/items.adapter";

export default class ItemsController {

    private readonly _itemsService: ItemsService;
    private readonly _listsService: ListsService;
    private readonly _itemsAdapter: ItemsAdapter;

    constructor(itemsService: ItemsService, listsService: ListsService, itemsAdapter: ItemsAdapter) {
        this._itemsService = itemsService;
        this._listsService = listsService;
        this._itemsAdapter = itemsAdapter;;
    }

    async getAllListItems(req: Request, res: Response, next: NextFunction) {
        const [errAddItem, items] = await attempt(this._itemsService.getAllListItems(req.params.listId));
        if(errAddItem) {
            res.status(RequestStatus.SERVER_ERROR).send(errAddItem.message || errAddItem.description);
            return;
        }
        res.status(RequestStatus.OK).send(this._itemsAdapter.prepareResponse(items));
    }

    async addListItem(req: Request, res: Response, next: NextFunction) {
        const [errAddItem, item] = await attempt(this._itemsService.addListItem(req.body, req.params.listId));
        if(errAddItem) {
            res.status(RequestStatus.SERVER_ERROR).send(errAddItem.message || errAddItem.description);
            return;
        }
        res.status(RequestStatus.OK).send(this._itemsAdapter.prepareResponse([item]));
    }

    async editListItem(req: Request, res: Response, next: NextFunction) {
        const [errEditItem, item] = await attempt(this._itemsService.editListItem(req.body, req.params.itemId, req.params.listId));
        if(errEditItem) {
            res.status(RequestStatus.SERVER_ERROR).send(errEditItem.message || errEditItem.description);
            return;
        }
        res.status(RequestStatus.OK).send(this._itemsAdapter.prepareResponse([item]));
    }

    async deleteListItem(req: Request, res: Response, next: NextFunction) {
        const [errDeleteItem] = await attempt(this._itemsService.deleteListItem(req.params.itemId));
        if (errDeleteItem) {
            res.status(RequestStatus.SERVER_ERROR).send(errDeleteItem.message || errDeleteItem.description);
            return;
        }
        res.status(RequestStatus.OK).send();
    }
}

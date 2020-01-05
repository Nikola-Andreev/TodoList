import * as attempt from "@assertchris/attempt-promise";
import {NextFunction, Request, Response} from "express";
import ListsService from "../services/lists.service";
import RequestStatus from "../enums/RequestStatus";
import ListsAdapter from "../adapters/lists.adapter";

export default class ListsController {

    private readonly _listsService: ListsService;
    private readonly _listsAdapter: ListsAdapter;

    constructor(listsService: ListsService, listsAdapter: ListsAdapter) {
        this._listsService = listsService;
        this._listsAdapter = listsAdapter;
    }

    async getAllUserLists(req: Request, res: Response, next: NextFunction) {
        const [err, lists] = await attempt(this._listsService.getAllUserLists(req.user.id));
        if(err) {
            res.status(RequestStatus.SERVER_ERROR).send(err.message || err.description);
            return;
        }
        res.status(RequestStatus.OK).send(this._listsAdapter.prepareResponse(lists));
    }
}

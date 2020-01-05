import * as attempt from "@assertchris/attempt-promise";
import {NextFunction, Request, Response} from "express";
import ListsService from "../services/lists.service";
import RequestStatus from "../enums/RequestStatus";

export default class ListsController {

    private readonly _listsService: ListsService;

    constructor(listsService: ListsService) {
        this._listsService = listsService;
    }

    async getAllUserLists(req: Request, res: Response, next: NextFunction) {
        const [err, lists] = await attempt(this._listsService.getAllUserLists(req.user.id));
        if(err) {
            res.status(RequestStatus.SERVER_ERROR).send(err.message || err.description);
            return;
        }
        res.status(RequestStatus.OK).send(lists);
    }
}

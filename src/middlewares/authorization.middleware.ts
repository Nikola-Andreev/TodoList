import * as attempt from "@assertchris/attempt-promise";
import {NextFunction, Request, Response} from "express";
import ListService from "../services/lists.service";
import RequestStatus from "../enums/RequestStatus";

export default class AuthorizationMiddleware {

    private readonly _listService: ListService;

    constructor(listService: ListService) {
        this._listService = listService;
    }

    async checkIsUserOwnsTheList(req: Request, res: Response, next: NextFunction): Promise<void> {
        const [errGetList, list] = await attempt(this._listService.getUserListsById(req.params.listId));
        if(errGetList) {
            res.status(RequestStatus.SERVER_ERROR).send(errGetList.message || errGetList.description);
            return;
        } else if (list.owner_id !== req.user.id) {
            res.status(RequestStatus.UNAUTHORIZED).send("Unauthorized");
            return ;
        }
        next();
    }
}


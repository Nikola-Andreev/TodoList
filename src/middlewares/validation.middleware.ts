import {NextFunction, Request, Response} from "express";
import RequestStatus from "../enums/RequestStatus";
import ItemValidator from "../validators/item.validator";

export default class ValidationMiddleware {

    private readonly _itemValidator: ItemValidator;

    constructor(itemValidator: ItemValidator) {
        this._itemValidator = itemValidator;
    }

    async validateListItem(req: Request, res: Response, next: NextFunction): Promise<void> {
        const invalidData = this._itemValidator.validateListItem(req.body);
        if(invalidData) {
            res.status(RequestStatus.BAD_REQUEST).send(invalidData.details.map(d => d.message));
            return;
        }
        next();
    }
}


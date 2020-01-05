import * as Joi from "joi";
import {Request} from "express";

export default class ItemValidator {

    private listItemSchema = Joi.object({
        description: Joi.string().max(100).required(),
        status: Joi.string().valid(["new", "done"]).required()
    }).options({abortEarly: false});

    validateListItem(body: any) {
        return Joi.validate(body, this.listItemSchema).error;
    }
}

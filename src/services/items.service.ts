import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import RequestMethod from "../enums/RequestMethod";
import ServicesHelper from "../helpers/services.helper";

export default class ItemsService {

    private static readonly _baseItemsUrl = `${process.env.DB_BASE_URL}/appdata/${process.env.DB_APP_KEY}/items`;
    private static readonly _baseHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.MAIN_USER_AUTH_TOKEN}`
    };

    getAllListItems(listId: string): Promise<any> {
        const options = {
            url: `${ItemsService._baseItemsUrl}?list_id=${listId}`,
            method: RequestMethod.GET,
            headers: ItemsService._baseHeaders
        };
        return ServicesHelper.createPromiseRequest(options);
    }

    addListItem(data: any, listId: string): Promise<any> {
        const options = {
            url: ItemsService._baseItemsUrl,
            method: RequestMethod.POST,
            headers: ItemsService._baseHeaders,
            json: true,
            body: {
                list_id: listId,
                status: data.status,
                description: data.description
            }
        };
        return ServicesHelper.createPromiseRequest(options);
    }

    editListItem(data: any, itemId: string): Promise<any> {
        const options = {
            url: `${ItemsService._baseItemsUrl}/${itemId}`,
            method: RequestMethod.PUT,
            headers: ItemsService._baseHeaders,
            json: true,
            body: {
                status: data.status,
                description: data.description,
                list_id: data.listId
            }
        };
        return ServicesHelper.createPromiseRequest(options);
    }

    deleteListItem(itemId: string): Promise<any> {
        const options = {
            url: `${ItemsService._baseItemsUrl}/${itemId}`,
            method: RequestMethod.DELETE,
            headers: ItemsService._baseHeaders
        };
        return ServicesHelper.createPromiseRequest(options);
    }
}

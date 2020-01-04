import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import RequestMethod from "../enums/RequestMethod";
import ServicesHelper from "../helpers/services.helper";

export default class ListsService {

    private static readonly _baseListsUrl = `${process.env.DB_BASE_URL}/appdata/${process.env.DB_APP_KEY}/lists`;
    private static readonly _baseHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.MAIN_USER_AUTH_TOKEN}`
    };

    getAllUserLists(userId: string): Promise<any> {
        const options = {
            url: `${ListsService._baseListsUrl}?owner_id=${userId}`,
            method: RequestMethod.GET,
            headers: ListsService._baseHeaders
        };
        return ServicesHelper.createPromiseRequest(options);
    }
}
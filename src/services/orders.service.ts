import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import RequestMethod from "../enums/RequestMethod";
import ServicesHelper from "../helpers/services helper";

export default class OrdersService {

    private static readonly _baseOrdersUrl = `${process.env.DB_BASE_URL}/appdata/${process.env.DB_APP_KEY}/orders`;
    private static readonly _baseHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.MAIN_USER_AUTH_TOKEN}`
    };

    getAllOrders(): Promise<any> {
        const options = {
            url: OrdersService._baseOrdersUrl,
            method: RequestMethod.GET,
            headers: OrdersService._baseHeaders
        };

        return ServicesHelper.createPromiseRequest(options);
    }

    getOrderById(id: string): Promise<any> {
        const options = {
            url: `${OrdersService._baseOrdersUrl}/${id}`,
            method: RequestMethod.GET,
            headers: OrdersService._baseHeaders
        };

        return ServicesHelper.createPromiseRequest(options);
    }

    addOrder(data: any): Promise<any> {
        const options = {
            url: OrdersService._baseOrdersUrl,
            method: RequestMethod.POST,
            headers: OrdersService._baseHeaders,
            json: true,
            body: {
                products: data.products,
                status: data.status,
                date: new Date()
            }
        };

        return ServicesHelper.createPromiseRequest(options);
    }

    editOrder(data: any, id: string): Promise<any> {
        const options = {
            url: `${OrdersService._baseOrdersUrl}/${id}`,
            method: RequestMethod.PUT,
            headers: OrdersService._baseHeaders,
            json: true,
            body: {
                products: data.products,
                status: data.status,
                date: data.date
            }
        };

        return ServicesHelper.createPromiseRequest(options);
    }
}
import RequestMethod from "../enums/RequestMethod";
import ServicesHelper from "../helpers/services helper";

export default class OrdersService {

    private static readonly _baseOrdersUrl = 'https://baas.kinvey.com/appdata/kid_rJYPtVPCS/orders';
    private static readonly _baseHeaders = {
        'Content-Type': 'application/json',
        'Authorization': "Basic YWRtaW46YWRtaW4"
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
                price: data.price,
                category: data.category,
                name: data.name
            }
        };

        return ServicesHelper.createPromiseRequest(options);
    }

    deleteOrder(id: string): Promise<any> {
        const options = {
            url: `${OrdersService._baseOrdersUrl}/${id}`,
            method: RequestMethod.DELETE,
            headers: OrdersService._baseHeaders
        };

        return ServicesHelper.createPromiseRequest(options);
    }
}
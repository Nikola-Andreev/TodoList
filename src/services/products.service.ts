import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import RequestMethod from "../enums/RequestMethod";
import ServicesHelper from "../helpers/services.helper";

export default class ProductsService {

    private static readonly _baseProductsUrl = `${process.env.DB_BASE_URL}/appdata/${process.env.DB_APP_KEY}/products`;
    private static readonly _baseHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.MAIN_USER_AUTH_TOKEN}`
    };

    getAllProducts(): Promise<any> {
        const options = {
            url: ProductsService._baseProductsUrl,
            method: RequestMethod.GET,
            headers: ProductsService._baseHeaders
        };

        return ServicesHelper.createPromiseRequest(options);
    }

    getProductById(id: string): Promise<any> {
        const options = {
            url: `${ProductsService._baseProductsUrl}/${id}`,
            method: RequestMethod.GET,
            headers: ProductsService._baseHeaders
        };

        return ServicesHelper.createPromiseRequest(options);
    }

    addProduct(data: any): Promise<any> {
        const options = {
            url: ProductsService._baseProductsUrl,
            method: RequestMethod.POST,
            headers: ProductsService._baseHeaders,
            json: true,
            body: {
                price: data.price,
                category: data.category,
                name: data.name
            }
        };

        return ServicesHelper.createPromiseRequest(options);
    }

    editProduct(data: any, id: string): Promise<any> {
        const options = {
            url: `${ProductsService._baseProductsUrl}/${id}`,
            method: RequestMethod.PUT,
            headers: ProductsService._baseHeaders,
            json: true,
            body: {
                price: data.price,
                category: data.category,
                name: data.name
            }
        };

        return ServicesHelper.createPromiseRequest(options);
    }

    deleteProduct(id: string): Promise<any> {
        const options = {
            url: `${ProductsService._baseProductsUrl}/${id}`,
            method: RequestMethod.DELETE,
            headers: ProductsService._baseHeaders
        };

        return ServicesHelper.createPromiseRequest(options);
    }
}
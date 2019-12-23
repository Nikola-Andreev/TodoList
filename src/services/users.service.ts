import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import RequestMethod from "../enums/RequestMethod";
import ServicesHelper from "../helpers/services helper";

export default class UsersService {

    private static readonly _baseProductsUrl = `${process.env.DB_BASE_URL}/user/${process.env.DB_APP_KEY}`;
    private static readonly _baseHeaders = {
        'Content-Type': 'application/json',
    };

    getUserById(id: String): Promise<any> {
        const options = {
            url: `${UsersService._baseProductsUrl}/${id}`,
            method: RequestMethod.GET,
            headers: {
                ...UsersService._baseHeaders,
                'Authorization': `Basic ${process.env.MAIN_USER_AUTH_TOKEN}`
            }
        };
        
        return ServicesHelper.createPromiseRequest(options);
    }

    login(username: String, password: String): Promise<any> {
        const options = {
            url: `${UsersService._baseProductsUrl}/login`,
            method: RequestMethod.POST,
            headers: {
                ...UsersService._baseHeaders,
                'Authorization': `Basic ${process.env.APP_AUTH_TOKEN}`
            },
            json: true,
            body: {
                username,
                password
            }
        };
        
        return ServicesHelper.createPromiseRequest(options);
    }
}
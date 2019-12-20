import RequestMethod from "../enums/RequestMethod";
import ServicesHelper from "../helpers/services helper";

export default class UsersService {

    private static readonly _baseProductsUrl = 'https://baas.kinvey.com/appdata/kid_rJYPtVPCS/products';
    private static readonly _baseHeaders = {
        'Content-Type': 'application/json',
    };

    getUserById(id: String): Promise<any> {
        const options = {
            url: `${UsersService._baseProductsUrl}/${id}`,
            method: RequestMethod.GET,
            headers: {
                ...UsersService._baseHeaders,
                'Authorization': "Basic YWRtaW46YWRtaW4"
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
                'Authorization': "Basic a2lkX3JKWVB0VlBDUzpiNjE2NzRjNjg1YTg0NGRhOWIzZTViMWU4NTE4MWQyZg=="
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
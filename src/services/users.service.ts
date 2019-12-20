import * as request from "request";

export default class UsersService {

    constructor() { }

    getUserById(id: String): Promise<any> {
        const options = {
            url: `https://baas.kinvey.com/user/kid_rJYPtVPCS/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Basic YWRtaW46YWRtaW4"
            }
        };
        
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    login(username: String, password: String): Promise<any> {
        const options = {
            url: 'https://baas.kinvey.com/user/kid_rJYPtVPCS/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Basic a2lkX3JKWVB0VlBDUzpiNjE2NzRjNjg1YTg0NGRhOWIzZTViMWU4NTE4MWQyZg=="
            },
            json: true,
            body: {
                username,
                password
            }
        };
        
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    }
}
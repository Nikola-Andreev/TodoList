import * as request from "request";

export default class ServicesHelper {

    static createPromiseRequest(options) {
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
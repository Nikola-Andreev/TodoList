import * as request from "request";

export default class ServicesHelper {

    static createPromiseRequest(options) {
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                const jsonBody = JSON.parse(body);
                if (error || jsonBody.error) {
                    reject(error || jsonBody);
                } else {
                    resolve(body);
                }
            });
        });
    }
    
}
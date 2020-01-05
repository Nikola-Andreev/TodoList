import * as request from "request";

export default class ServicesHelper {

    static createPromiseRequest(options) {
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                let jsonBody: any = {};
                try {
                    jsonBody = JSON.parse(body);
                } catch(ignoreErr) {}
                
                if (error || jsonBody.error) {
                    reject(error || jsonBody);
                } else {
                    resolve(typeof body === "string" ? JSON.parse(body) : body);
                }
            });
        });
    }
    
}

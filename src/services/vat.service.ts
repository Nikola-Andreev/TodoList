import * as request from "request";

export default class VatService {

    getAllVats(): Promise<any> {
        const options = {
            url: 'https://jsonvat.com',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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
}
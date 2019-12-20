import * as request from "request";

export default class ProductsService {

    getAllProducts(): Promise<any> {
        const options = {
            url: 'https://baas.kinvey.com/appdata/kid_rJYPtVPCS/products',
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

    getProductById(id: string): Promise<any> {
        const options = {
            url: `https://baas.kinvey.com/appdata/kid_rJYPtVPCS/products/${id}`,
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

    addProduct(data: any): Promise<any> {
        const options = {
            url: 'https://baas.kinvey.com/appdata/kid_rJYPtVPCS/products',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Basic YWRtaW46YWRtaW4"
            },
            json: true,
            body: {...data}
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

    editProduct(data: any, id: string): Promise<any> {
        const options = {
            url: `https://baas.kinvey.com/appdata/kid_rJYPtVPCS/products/${id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Basic YWRtaW46YWRtaW4"
            },
            json: true,
            body: {
                price: data.price,
                category: data.category,
                name: data.name
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

    deleteProduct(id: string): Promise<any> {
        const options = {
            url: `https://baas.kinvey.com/appdata/kid_rJYPtVPCS/products/${id}`,
            method: 'DELETE',
            headers: {
                'Authorization': "Basic YWRtaW46YWRtaW4"
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
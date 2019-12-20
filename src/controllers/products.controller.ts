import {NextFunction, Request, Response} from 'express';
import ProductsService from "../services/products.service";
import ProductsAdapter from "../adapters/products.adapter";

export default class ProductsController {

    private readonly _productsService: ProductsService;
    private readonly _productsAdapter: ProductsAdapter;

    constructor(productsService: ProductsService, productsAdapter: ProductsAdapter) {
        this._productsService = productsService;
        this._productsAdapter = productsAdapter;
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        const products: any[] = await this._productsService.getAllProducts().catch((err) => {
            res.status(500).send(err.message);
        });
        if(!products) return; 
        res.status(200).send(this._productsAdapter.prepareResponse(products));
    }

    async addProduct(req: Request, res: Response, next: NextFunction) {
        const countryCode: string = req.user.countryCode;
        const product: any = await this._productsService.addProduct(req.body).catch(err => {
            res.status(500).send(err.message);
        });
        if(!product) return; 
        const responseProduct = this._productsAdapter.prepareResponse([product], countryCode);
        res.status(200).send(responseProduct);
    }

    async editProduct(req: Request, res: Response, next: NextFunction) {
        const productId: string = req.params.id;
        const countryCode: string = req.user.countryCode;
        let responseSend = false;
        const currentProduct = await this._productsService.getProductById(productId).catch(err => {
            res.status(500).send(err.message);
            responseSend = true;
        });
        if (!currentProduct && !responseSend) {
            res.status(404).send("Product not fownd");
            return;
        }
        const updateData = this._productsAdapter.mergeObjects(currentProduct, req.body);
        const updatedProduct: any = await this._productsService.editProduct(updateData, req.params.id).catch(err => {
            res.status(500).send(err.message);
        });
        if(!updatedProduct) return;
        const responseProduct = this._productsAdapter.prepareResponse([updatedProduct], countryCode);
        res.status(200).send(responseProduct);
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        let responseSend = false;
        await this._productsService.deleteProduct(req.params.id).catch(err => {
                res.status(500).send(err.message);
                responseSend = true;
        });
        if(responseSend) return;
        res.status(200).send();
    }
}

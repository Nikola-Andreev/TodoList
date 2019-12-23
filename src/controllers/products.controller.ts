import * as attempt from "@assertchris/attempt-promise";
import {NextFunction, Request, Response} from "express";
import ProductsService from "../services/products.service";
import ProductsAdapter from "../adapters/products.adapter";

export default class ProductsController {

    private static readonly _notFoundErrorMessage = "Product not found";
    private readonly _productsService: ProductsService;
    private readonly _productsAdapter: ProductsAdapter;

    constructor(productsService: ProductsService, productsAdapter: ProductsAdapter) {
        this._productsService = productsService;
        this._productsAdapter = productsAdapter;
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        const [err, products] = await attempt(this._productsService.getAllProducts());
        if(err) {
            res.status(500).send(err.message);
            return;
        };
        res.status(200).send(this._productsAdapter.prepareResponse(JSON.parse(products)));
    }

    async addProduct(req: Request, res: Response, next: NextFunction) {
        const countryCode: string = req.user.countryCode;
        const [err, product] = await attempt(this._productsService.addProduct(req.body));
        if(err) {
            res.status(500).send(err.message);
            return;
        };
        const responseProduct = this._productsAdapter.prepareResponse([product], countryCode);
        res.status(200).send(responseProduct);
    }

    async editProduct(req: Request, res: Response, next: NextFunction) {
        const productId: string = req.params.id;
        const countryCode: string = req.user.countryCode;
        const [errGet, currentProduct] = await attempt(this._productsService.getProductById(productId));
        if(errGet) {
            res.status(500).send(errGet.message);
            return;
        } else if (!currentProduct) {
            res.status(404).send(ProductsController._notFoundErrorMessage);
            return;
        }
        const updateData = this._productsAdapter.mergeObjects(JSON.parse(currentProduct), req.body);
        const [errUpdate, updatedProduct] = await attempt(this._productsService.editProduct(updateData, req.params.id));
        if(errUpdate) {
            res.status(500).send(errUpdate.message);
            return;
        }
        const responseProduct = this._productsAdapter.prepareResponse([updatedProduct], countryCode);
        res.status(200).send(responseProduct);
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        const [err, deleteResponse] = await attempt(this._productsService.deleteProduct(req.params.id));
        if(err) {
            res.status(500).send(err.message);
            return;
        } else if (JSON.parse(deleteResponse).error) {
            res.status(404).send(ProductsController._notFoundErrorMessage);
            return;
        }
        res.status(200).send();
    }
}

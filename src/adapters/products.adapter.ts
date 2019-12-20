import VatService from "../services/vat.service";

export default class ProductsAdapter {

    private readonly _vatService: VatService;
    private _vatRates: any;
    private _defaultVatRate = 20;

    constructor(vatService: VatService) {
        this._vatService = vatService;
        this.setVatRates();
    }

    private async setVatRates() {
        const vats: any = await this._vatService.getAllVats();
        this._vatRates = vats.rates;
    }

    mergeObjects(currentProduct: any, newProduct: any) {
        return {...currentProduct, ...newProduct}
    }

    prepareResponse(products: any, countryCode?: string) {
        const targetRate = this._vatRates.find(vr => vr.country_code === countryCode);
        let rate = this._defaultVatRate;
        if (targetRate) {
            rate = targetRate.periods.standart;
        }
        return products.map((product) => {
            product.id = product._id; 
            product.price = this.getPriceWithVat(product.price, rate);
            delete product._id;
            delete product._acl;
            delete product._kmd;
            return product; 
        })
    }

    private getPriceWithVat(price, rate) {
        const vat = (rate / 100) * price;
        return vat + price;
    }
}

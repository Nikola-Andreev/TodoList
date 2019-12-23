import ServicesHelper from "../helpers/services.helper";
import RequestMethod from "../enums/RequestMethod";

export default class VatService {

    private static readonly _baseVatUrl = 'https://jsonvat.com';
    private static readonly _baseHeaders = {
        'Content-Type': 'application/json',
    };

    getAllVats(): Promise<any> {
        const options = {
            url: VatService._baseVatUrl,
            method: RequestMethod.GET,
            headers: VatService._baseHeaders
        };

        return ServicesHelper.createPromiseRequest(options);
    }
}
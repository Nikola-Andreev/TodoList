import {NextFunction, Request, Response} from 'express';
import UsersService from "../services/users.service";
import JWT from "../configurations/jwt.configuration";

export default class UsersController {

    private static readonly _defaultCountryCode: string = 'BG';

    private readonly _usersService: UsersService;
    private readonly _jwt: JWT;

    constructor(usersService: UsersService, jwt: JWT) {
        this._usersService = usersService;
        this._jwt = jwt;
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const userData = req.body;
        await this._usersService.login(userData.username, userData.password).then(userData => {
            const jwtObject = {
                id: userData._id,
                countryCode: UsersController._defaultCountryCode
            };
            const jwt = `jwt ${this._jwt.generateToken(jwtObject)}`;
            res.status(200).send(jwt);
        }).catch(err => {
            res.status(500).send(err.message);
        });
    }
}

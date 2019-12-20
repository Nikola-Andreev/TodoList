import {NextFunction, Request, Response} from 'express';
import UsersService from "../services/users.service";
import JWT from "../configurations/jwt.configuration";

export default class UsersController {

    private readonly _usersService: UsersService;
    private readonly _jwt: JWT;

    constructor(usersService: UsersService, jwt: JWT) {
        this._usersService = usersService;
        this._jwt = jwt;
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        const user = await this._usersService.getUserById("5df9b9dd3f6800001bace6b3").catch(err => {
            console.log("sdasds");
            console.log(err);
        });
        console.log(user);
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const userData = req.body;
        await this._usersService.login(userData.username, userData.password).then(userData => {
            const jwtObject = {
                id: userData._id,
                countryCode: "BG"
            };
            const jwt = `jwt ${this._jwt.generateToken(jwtObject)}`;
            res.status(200).send(jwt);
        }).catch(err => {
            res.status(500).send(err.message);
        });
    }
}

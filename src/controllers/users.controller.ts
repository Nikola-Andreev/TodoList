import * as attempt from "@assertchris/attempt-promise";
import {NextFunction, Request, Response} from "express";
import UsersService from "../services/users.service";
import JWT from "../configurations/jwt.configuration";
import RequestStatus from "../enums/RequestStatus";

export default class UsersController {

    private readonly _usersService: UsersService;
    private readonly _jwt: JWT;

    constructor(usersService: UsersService, jwt: JWT) {
        this._usersService = usersService;
        this._jwt = jwt;
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const userData = req.body;
        const [err, loginData] = await attempt(this._usersService.login(userData.username, userData.password));
        if(err) {
            res.status(RequestStatus.SERVER_ERROR).send(err.message);
            return;
        } else if (loginData.error) {
            res.status(RequestStatus.UNAUTHORIZED).send(loginData.description || loginData.error);
            return;
        }
        const jwtObject = {
            id: loginData._id
        };
        const jwt = `jwt ${this._jwt.generateToken(jwtObject)}`;
        res.status(RequestStatus.OK).send(jwt);
    }
}

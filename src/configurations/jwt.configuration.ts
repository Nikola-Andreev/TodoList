import * as attempt from "@assertchris/attempt-promise";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { Strategy, ExtractJwt } from "passport-jwt";
import UsersService from "../services/users.service";

export default class JWT {

    private readonly _userService: UsersService;
    
    constructor(userService: UsersService) {
        this._userService = userService;
    }

    public configAuth(passport) {
        const options = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            secretOrKey: process.env.CONFIG_AUTH_KEY
        };

        passport.use(new Strategy(options, async (jwt_payload, next) => {
            let [err, user] = await attempt(this._userService.getUserById(jwt_payload.id));
            if(err) {
                next();
                return;
            };
            user = JSON.parse(user);
            user.countryCode = jwt_payload.countryCode;
            next(null, user);
        }));
    }

    public generateToken(jwtObject) {
        return jwt.sign(jwtObject, process.env.CONFIG_AUTH_KEY, {
            expiresIn: "1h"
        });
    }
}


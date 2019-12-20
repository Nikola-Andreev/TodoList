import { Strategy, ExtractJwt } from "passport-jwt";
import * as jwt from "jsonwebtoken";
// import * as dotenv from "dotenv";
import { Request } from "express";
// dotenv.config({ path: ".env" });
import UsersService from "../services/users.service";

export default class JWT {

    private readonly _userService: UsersService;
    
    constructor(userService: UsersService) {
        this._userService = userService;
    }

    public configAuth(passport) {
        const options = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            secretOrKey: "TOP_SECRET_KEY" // process.env.CONFIG_AUTH_KEY
        };

        passport.use(new Strategy(options, async (jwt_payload, next) => {
            const user = await this._userService.getUserById(jwt_payload.id);
            user.countryCode = jwt_payload.countryCode;
            next(null, user);
        }));
    }

    public generateToken(jwtObject) {
        return jwt.sign(jwtObject, "TOP_SECRET_KEY", {
            expiresIn: "1h"
        });
    }
}


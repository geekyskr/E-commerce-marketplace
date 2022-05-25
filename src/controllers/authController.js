import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { EntityAuthModel } from "../models/entityAuthModel.js";
import { validateRequestForRegister, validateRequestForLogin} from "../validator.js/authControllerValidator.js";

import bunyan from "bunyan";
var log = bunyan.createLogger({name: "auth-controller"});

export class AuthController {
    async register(req, res, next) {
        const registerPayload = req.body;
        log.info({registerPayload});
        try {
            validateRequestForRegister(registerPayload);
        } catch (error) {
            log.warn(error);
            return res.status(400).send(error.message);
        }
        const entityAuthModel = new EntityAuthModel();
        const entityAuthObject = {
            userName: registerPayload.username,
            userId: uuidv4(),
            userPassword: await  bcrypt.hash(registerPayload.password, 10),
            userType: registerPayload.user_type
        };
        try {
            const isUsernameExist = await entityAuthModel.isUsernameExist(entityAuthObject.userName);
            if(isUsernameExist) {
                return res.status(409).send("username exist: Please use unique username");
            }
            await entityAuthModel.createUser(entityAuthObject);
            res.status(201).send();
        } catch(error) {
            log.warn(error)
            res.status(500).send();
        }
    }

    async login(req, res) {
        const loginPayload = req.body;
        log.info([loginPayload]);
        try {
            validateRequestForLogin(loginPayload);
        } catch (error) {
            log.warn(error);
            return res.status(400).send(error.message);
        }
        const entityAuthModel = new EntityAuthModel();
        const username = loginPayload.username;
        const password = loginPayload.password;
        try {
            const result = await entityAuthModel.logIn(username, password);
            res.status(200).send({JWTAuthToken: result});
        } catch(error) {
            log.warn(error);
            if(error == "user does not exist") {
                return res.status(404).send(error);
            } else if(error == "wrong password") {
                return res.status(401).send(error);
            }
            res.status(500).send();
        }
    }
}
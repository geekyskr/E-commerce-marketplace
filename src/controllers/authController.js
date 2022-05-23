import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { EntityAuthModel } from "../models/entityAuthModel.js";
import { validateRequestForRegister, validateRequestForLogin} from "../validator.js/authControllerValidator.js";

export class AuthController {
    async register(req, res, next) {
        const registerPayload = req.body;
        try {
            validateRequestForRegister(registerPayload);
        } catch (error) {
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
            const result = await entityAuthModel.createUser(entityAuthObject);
            res.status(201).send(result);
        } catch(error) {
            res.status(500).send(error.message);
        }
    }

    async login(req, res) {
        const loginPayload = req.body;
        try {
            validateRequestForLogin(loginPayload);
        } catch (error) {
            return res.status(400).send(error.message);
        }
        const entityAuthModel = new EntityAuthModel();
        const username = loginPayload.username;
        const password = loginPayload.password;
        try {
            const result = await entityAuthModel.logIn(username, password);
            res.status(200).send({JWTAuthToken: result});
        } catch(error) {
            res.status(500).send(error.message);
        }
    }
}
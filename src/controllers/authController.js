import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { EntityAuthModel } from "../models/entityAuthModel.js";

export class AuthController {
    async register(req, res, next) {
        const entityAuthModel = new EntityAuthModel();
        const entityAuthObject = {
            userName: req.body.username,
            userId: uuidv4(),
            userPassword: await  bcrypt.hash(req.body.password, 10),
            userType: req.body.user_type
        };
        try {
            const result = await entityAuthModel.createUser(entityAuthObject);
            res.status(201).send(result);
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async login(req, res) {
        const entityAuthModel = new EntityAuthModel();
        const username = req.body.username;
        const password = req.body.password;
        try {
            const result = await entityAuthModel.logIn(username, password);
            res.status(200).send({JWTAuthToken: result});
        } catch(error) {
            res.status(500).send(error);
        }
    }
}
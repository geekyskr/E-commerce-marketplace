import { ProductsModel } from "../models/productsModel.js";
import { OrdersModel } from "../models/ordersModel.js";
import { validateRequestForCreateCatalog } from "../validator.js/sellerControllerValidator.js";

import bunyan from "bunyan";
var log = bunyan.createLogger({name: "auth-controller"});

export class SellerController {
    async createCatalog(req, res, next) {
        const createCatalogPayload = req.body;
        log.info({createCatalogPayload}, "user trying to create catalog");
        try {
            validateRequestForCreateCatalog(createCatalogPayload);
        } catch (error) {
            log.warn(error);
            return res.status(400).send(error.message);
        }
        const productsModel = new ProductsModel();
        const products = createCatalogPayload;
        try {
            await productsModel.createCatalog(products, req.user.userId);
            res.status(201).send();
        } catch (error) {
            log.warn(error);
            res.status(500).send();
        }
    }

    async  getAllOrders(req, res) {
        const ordersModel = new OrdersModel();
        try {
            const orderList = await ordersModel.getAllOrders(req.user.userId);
            res.status(200).send(orderList);
        } catch(error) {
            log.warn(error);
            res.status(500).send();
        }
    }
}
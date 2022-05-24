import { ProductsModel } from "../models/productsModel.js";
import { OrdersModel } from "../models/ordersModel.js";
import { validateRequestForCreateCatalog } from "../validator.js/sellerControllerValidator.js";

export class SellerController {
    async createCatalog(req, res, next) {
        const createCatalogPayload = req.body;
        try {
            validateRequestForCreateCatalog(createCatalogPayload);
        } catch (error) {
            return res.status(400).send(error.message);
        }
        const productsModel = new ProductsModel();
        const products = createCatalogPayload;
        try {
            await productsModel.createCatalog(products, req.user.userId);
            res.status(201).send();
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async  getAllOrders(req, res) {
        const ordersModel = new OrdersModel();
        try {
            const orderList = await ordersModel.getAllOrders(req.user.userId);
            res.status(200).send(orderList);
        } catch(error) {
            res.status(500).send(error.message);
        }
    }
}
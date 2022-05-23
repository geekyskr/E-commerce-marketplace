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
        const user = req.user;
        if(user.userType != "Seller") {
            return res.status(403).send("Only Seller can access this resource");
        }
        try {
            await productsModel.createCatalog(products, user.userId);
            res.status(201).send(products);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async  getAllOrders(req, res) {
        const ordersModel = new OrdersModel();
        const user = req.user;
        if(user.userType != "Seller") {
            res.status(403).send("Only Seller can access this resource");
        }
        try {
            const orderList = await ordersModel.getAllOrders(user.userId);
            res.status(200).send(orderList);
        } catch(error) {
            res.status(500).send(error.message);
        }
    }
}
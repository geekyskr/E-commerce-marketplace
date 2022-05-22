import { ProductsModel } from "../models/productsModel.js";

export class SellerController {
    async createCatalog(req, res, next) {
        const productsModel = new ProductsModel();
        const products = req.body;
        const user = req.user;
        if(user.userType != "Seller") {
            res.status(403).send("Only Seller can access this resource");
        }
        try {
            await productsModel.createCatalog(products, user.userId);
            res.status(201).send(products);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async  getAllOrders(request, response) {

    }
}
import { ProductsModel } from "../models/productsModel.js";

export class SellerController {
    async createCatalog(req, res, next) {
        const productsModel = new ProductsModel();
        const products = req.body;
        console.log(req.user);
        // const modelProducts = generateModelProducts(products);
        try {
            await productsModel.createCatalog(products);
            res.status(201).send(products);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async  getAllOrders(request, response) {

    }
}
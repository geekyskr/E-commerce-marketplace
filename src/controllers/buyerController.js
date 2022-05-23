import { EntityAuthModel } from "../models/entityAuthModel.js";
import { ProductsModel } from "../models/productsModel.js";

export class BuyerController {
    async getAllSellerList(req, res) {
        const entityAuthModel = new EntityAuthModel();
        const user = req.user;
        if(user.userType != "Buyer") {
            res.status(403).send("Only Buyer can access this resource");
        }
        try {
            const allSellerList = await entityAuthModel.getSellerList();
            res.status(200).send(allSellerList);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getSellerCatalog(req, res) {
        const productsModel = new ProductsModel();
        const user = req.user;
        const sellerId = req.params.seller_id;
        if(user.userType != "Buyer") {
            res.status(403).send("Only Buyer can access this resource");
        }
        try {
            const sellerCatalog = await productsModel.getSellerCatalog(sellerId);
            res.status(200).send(sellerCatalog);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async createOrder(request, response) {
        
    }
}
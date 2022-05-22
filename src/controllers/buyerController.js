import { EntityAuthModel } from "../models/entityAuthModel.js";

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

    async getSellerCatalog(request, response) {

    }

    async createOrder(request, response) {
        
    }
}
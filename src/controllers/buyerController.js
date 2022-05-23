import { EntityAuthModel } from "../models/entityAuthModel.js";
import { ProductsModel } from "../models/productsModel.js";
import { OrdersModel } from "../models/ordersModel.js";
import { v4 as uuidv4 } from 'uuid';
import { validateRequestForCreateOrder } from "../validator.js/buyerControllerValidator.js";

export class BuyerController {
    async getAllSellerList(req, res) {
        const entityAuthModel = new EntityAuthModel();
        const user = req.user;
        if(user.userType != "Buyer") {
            return res.status(403).send("Only Buyer can access this resource");
        }
        try {
            const allSellerList = await entityAuthModel.getSellerList();
            res.status(200).send(allSellerList);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getSellerCatalog(req, res) {
        const productsModel = new ProductsModel();
        const user = req.user;
        const sellerId = req.params.seller_id;
        if(user.userType != "Buyer") {
            return res.status(403).send("Only Buyer can access this resource");
        }
        try {
            const sellerCatalog = await productsModel.getSellerCatalog(sellerId);
            res.status(200).send(sellerCatalog);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async createOrder(req, res) {
        const createOrderPayload = req.body;
        try {
            validateRequestForCreateOrder(createOrderPayload);
        } catch(error) {
            return res.status(400).send(error.message);
        }
        const ordersModel = new OrdersModel();
        const user = req.user;
        const sellerId = req.params.seller_id;
        const productIds = createOrderPayload;
        if(user.userType != "Buyer") {
            return res.status(403).send("Only Buyer can access this resource");
        }
        const orderId = uuidv4();
        const modelValues = productIds.map((productId)=>{
            return [orderId, productId, sellerId, user.userId];
        });
        try {
            await ordersModel.createOrder(modelValues);
            res.status(201).send(modelValues);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}
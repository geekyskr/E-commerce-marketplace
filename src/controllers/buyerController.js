import { EntityAuthModel } from "../models/entityAuthModel.js";
import { ProductsModel } from "../models/productsModel.js";
import { OrdersModel } from "../models/ordersModel.js";
import { v4 as uuidv4 } from 'uuid';
import { validateRequestForCreateOrder } from "../validator.js/buyerControllerValidator.js";

import bunyan from "bunyan";
var log = bunyan.createLogger({name: "buyer-controller"});

export class BuyerController {
    async getAllSellerList(req, res) {
        const entityAuthModel = new EntityAuthModel();
        try {
            const allSellerList = await entityAuthModel.getSellerList();
            res.status(200).send(allSellerList);
        } catch (error) {
            log.warn(error);
            res.status(500).send();
        }
    }

    async getSellerCatalog(req, res) {
        const productsModel = new ProductsModel();
        const sellerId = req.params.seller_id;
        try {
            const sellerCatalog = await productsModel.getSellerCatalog(sellerId);
            res.status(200).send(sellerCatalog);
        } catch (error) {
            log.warn(error);
            res.status(500).send();
        }
    }

    async createOrder(req, res) {
        const createOrderPayload = req.body;
        log.info({createOrderPayload}, "user trying to create order");
        const productsModel = new ProductsModel();
        const sellerId = req.params.seller_id;
        try {
            validateRequestForCreateOrder(createOrderPayload);
            const sellerCatalogDetails = await productsModel.getSellerCatalog(sellerId);
            const sellerCatalog = sellerCatalogDetails.map((product)=>{
                return (JSON.parse(JSON.stringify(product))).productId;
            })
            if(!createOrderPayload.every(element => sellerCatalog.indexOf(element) > -1)) {
                throw new Error("Item should present in seller catalog");
            }
        } catch(error) {
            log.warn(error);
            return res.status(400).send(error.message);
        }
        const ordersModel = new OrdersModel();
        const productIds = createOrderPayload;
        const orderId = uuidv4();
        const modelValues = productIds.map((productId)=>{
            return [orderId, productId, sellerId, req.user.userId];
        });
        try {
            await ordersModel.createOrder(modelValues);
            res.status(201).send();
        } catch (error) {
            log.warn(error);
            res.status(500).send();
        }
    }
}
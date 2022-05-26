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
        const productsModel = new ProductsModel();
        try {
            const orderList = await ordersModel.getAllOrders(req.user.userId);
            const orders = [];
            for(let index = 0; index<orderList.length; index++) {
                const orderId = orderList[index].orderId;
                let Items = await ordersModel.getAllItems(orderId);
                Items = await Promise.all(Items.map(async (product)=>{
                    const productDetails = await productsModel.getProductDetailsByProductId(product.productId);
                    return productDetails[0];
                }))
                let currOrder = {};
                currOrder.orderId = orderId;
                currOrder.items = Items;
                orders.push(currOrder);
            }
            res.status(200).send(orders);
        } catch(error) {
            log.warn(error);
            res.status(500).send();
        }
    }
}
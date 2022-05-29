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
        try {
            const sellerId = req.user.userId;
            // any of below  method can be used to get orders.
            // const orders = await getOrdersWithItems(sellerId);   // more db call. less local memory.
            const orders = await getOrdersWithItemsMinDBCalls(sellerId);    // less db call. more local memory.
            res.status(200).send(orders);
        } catch(error) {
            log.warn(error);
            res.status(500).send();
        }
    }
}


async function getOrdersWithItems(sellerId) {
    const productsModel = new ProductsModel();
    const ordersModel = new OrdersModel();
    const orderList = await ordersModel.getAllOrders(sellerId);
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
    return orders;
}

async function getOrdersWithItemsMinDBCalls(sellerId) {
    const productsModel = new ProductsModel();
    const ordersModel = new OrdersModel();
    const orderItemList = await ordersModel.getAllOrdersWithItems(sellerId);
    const catalogDetails = await productsModel.getSellerCatalog(sellerId);
    const catalogMap = new Map();
    for(const product of catalogDetails) {
        catalogMap.set(product.productId, JSON.parse(JSON.stringify(product)));
    }
    const orderMap = new Map();
    for(const order of orderItemList) {
        const key = order.orderId;
        const value = catalogMap.get(order.productId);
        if(orderMap.has(key)) {
            orderMap.get(key).push(value);
        } else {
            orderMap.set(key, [value]);
        }
    }
    const orders = [];
    for(const [orderId, orderDetails] of orderMap) {
        const order = {
            orderId: orderId,
            items: orderDetails
        }
        orders.push(order);
    }
    return orders;
}
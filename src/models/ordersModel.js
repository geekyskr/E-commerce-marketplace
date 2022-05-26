import mysqlConnection from "./DBconnection.js";

import bunyan from "bunyan";
var log = bunyan.createLogger({name: "OrdersModel"});

export class OrdersModel {
    async createOrder(modelValues) {
        const table_name = "Orders";
        const query = "insert into " + table_name + " values ?";
        return new Promise((resolve, reject) => {
            mysqlConnection.query(query, [modelValues], (error, result) => {
                if(error) {
                    return reject(error);
                }
                else {
                    log.info({modelValues}, "New order created");
                    return resolve();
                }
            })
        })
    }

    async getAllOrders(sellerId) {
        const table_name = "Orders";
        const query = "select distinct orderId from " + table_name + " where sellerId = ?";
        return new Promise((resolve, reject) => {
            mysqlConnection.query(query, [sellerId], (error, result) => {
                if(error) {
                    return reject(error);
                }
                else return resolve(result);
            })
        })
    }

    async getAllItems(orderId) {
        const table_name = "Orders";
        const query = "select productId from " + table_name + " where orderId = ?";
        return new Promise((resolve, reject) => {
            mysqlConnection.query(query, [orderId], (error, result) => {
                if(error) {
                    return reject(error);
                }
                else return resolve(result);
            })
        })
    }
}
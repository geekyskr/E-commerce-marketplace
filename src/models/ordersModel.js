import mysqlConnection from "./DBconnection.js";

export class OrdersModel {
    async createOrder(modelValues) {
        const table_name = "Orders";
        const query = "insert into " + table_name + " values ?";
        return new Promise((resolve, reject) => {
            mysqlConnection.query(query, [modelValues], (error, result) => {
                if(error) {
                    return reject(error);
                }
                else return resolve(result);
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
}
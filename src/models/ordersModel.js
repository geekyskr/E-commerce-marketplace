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
}
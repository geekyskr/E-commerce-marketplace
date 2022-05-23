import mysqlConnection from "./DBconnection.js";
import { v4 as uuidv4 } from 'uuid';

export class ProductsModel {
    async createCatalog(products, userId) {
        const table_name = "Products";
        for(let i=0; i<products.length; i++) {
            products[i].push(userId);
            products[i].push(uuidv4());
        }
        const query = "INSERT INTO " + table_name + " (productName, productPrice, userId, productId) VALUES ?"
        return new Promise((resolve, reject) => {
            mysqlConnection.query(query, [products], (error, result) => {
                if (error) {
                    return reject(error.message);
                }
                else return resolve(result);
            });
        });
    }

    async getSellerCatalog(sellerId) {
        const table_name = "Products";
        const query  = "select productId, productName, productPrice from " + table_name + " where userId = ?";
        return new Promise((resolve, reject) => {
            mysqlConnection.query(query, [sellerId], (error, result) => {
                if(error) {
                    return reject(error.message);
                }
                else return resolve(result);
            })
        })
    }
}
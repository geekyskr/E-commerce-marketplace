import mysqlConnection from "./DBconnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class EntityAuthModel {
    async createUser(entityAuthObject) {
        const table_name = "EntityAuthInfo";
        const mySQL_query = "INSERT INTO " + table_name + " (userId, userName, userPassword, userType) VALUES ?";
        const values = [[entityAuthObject.userId, entityAuthObject.userName, entityAuthObject.userPassword, entityAuthObject.userType]];
        return new Promise((resolve, reject) => {
            mysqlConnection.query(mySQL_query, [values], (error, result) => {
                if (error) {
                    return reject(error.message);
                }
                else return resolve(result);
            });
        });
    }

    async logIn(username, password) {
        const table_name = "EntityAuthInfo";
        const mySQL_query = "select * from " + table_name + " where userName = ?";
        return new Promise((resolve, reject) => {
            mysqlConnection.query(mySQL_query, [username], async (error, result) => {
                if (error) {
                    return reject(error);
                }
                if (result.length > 0) {
                    const match = await bcrypt.compare(password, result[0].userPassword);
                    if (match) {
                        const jwtPayload = {
                            userId: result[0].userId,
                            userType: result[0].userType
                        }
                        const authToken = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY);
                        resolve(authToken);
                    } else {
                        return reject("wrong password");
                    }
                } else {
                    return reject("user does not exist");
                }
            });
        });
    }

    async getSellerList() {
        const table_name = "EntityAuthInfo";
        const query = "select userName from " + table_name + " where userType = ?"
        const userType = "Seller";
        return new Promise((resolve, reject)=>{
            mysqlConnection.query(query, [userType], (error, result)=> {
                if(error) return reject(error);
                let sellerList = result.map((seller)=>{
                    return seller.userName;
                });
                return resolve(sellerList);
            })
        })
    }
}
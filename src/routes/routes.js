import express from "express";
import pkg from 'body-parser';
import { AuthController } from "../controllers/authController";
import { BuyerController } from "../controllers/buyerController";
import { SellerController, SellerController } from "../controllers/sellerController";
const { json } = pkg;
const app = express();

const jsonParser = json()
app.use(jsonParser);

const authController = new AuthController();
const buyerController = new BuyerController();
const sellerController = new SellerController();

app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);
app.get("/api/buyer/list-of-sellers", buyerController.getAllSellerList);
app.get("/api/buyer/seller-catalog/:seller_id", buyerController.getSellerCatalog);
app.post("/api/buyer/create-order/:seller_id", buyerController.createOrder);
app.post("/api/seller/create-catalog", sellerController.createCatalog);
app.get("/api/seller/orders", sellerController.getAllOrders);

export default app;
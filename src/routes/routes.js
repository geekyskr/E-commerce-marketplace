import express from "express";
import pkg from 'body-parser';
import { AuthController } from "../controllers/authController.js";
import { BuyerController } from "../controllers/buyerController.js";
import { SellerController } from "../controllers/sellerController.js";
import { verifyToken } from "../middleware/authorization.js";
const { json } = pkg;
const app = express();

const jsonParser = json()
app.use(jsonParser);

const authController = new AuthController();
const buyerController = new BuyerController();
const sellerController = new SellerController();

app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);
app.get("/api/buyer/list-of-sellers", verifyToken, buyerController.getAllSellerList);
app.get("/api/buyer/seller-catalog/:seller_id", verifyToken, buyerController.getSellerCatalog);
app.post("/api/buyer/create-order/:seller_id", verifyToken, buyerController.createOrder);
app.post("/api/seller/create-catalog", verifyToken, sellerController.createCatalog);
app.get("/api/seller/orders", verifyToken, sellerController.getAllOrders);

export default app;
import express from "express";
import pkg from 'body-parser';
import { AuthController } from "../controllers/authController.js";
import { BuyerController } from "../controllers/buyerController.js";
import { SellerController } from "../controllers/sellerController.js";
import { verifyToken, verifyBuyer, verifySeller } from "../middleware/authorization.js";
const { json } = pkg;
const app = express();

const jsonParser = json()
app.use(jsonParser);

const authController = new AuthController();
const buyerController = new BuyerController();
const sellerController = new SellerController();

app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

app.get("/api/buyer/list-of-sellers", verifyToken, verifyBuyer, buyerController.getAllSellerList);
app.get("/api/buyer/seller-catalog/:seller_id", verifyToken, verifyBuyer, buyerController.getSellerCatalog);
app.post("/api/buyer/create-order/:seller_id", verifyToken, verifyBuyer, buyerController.createOrder);

app.post("/api/seller/create-catalog", verifyToken, verifySeller, sellerController.createCatalog);
app.get("/api/seller/orders", verifyToken, verifySeller, sellerController.getAllOrders);

export default app;
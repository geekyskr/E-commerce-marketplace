import express from "express";
import pkg from 'body-parser';
const { json } = pkg;
const app = express();

const jsonParser = json()

app.use(jsonParser);
app.post("/api/auth/register");
app.post("/api/auth/login");
app.get("/api/buyer/list-of-sellers");
app.get("/api/buyer/seller-catalog/:seller_id");
app.post("/api/buyer/create-order/:seller_id");
app.post("/api/seller/create-catalog");
app.get("/api/seller/orders");

export default app;
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyToken(req, res, next) {
    let token;
    try {
        const bearerToken = req.headers["authorization"];
        const bearer = bearerToken.split(" ");
        token = bearer[1];
    } catch (error) {
        return res.status(403).send("A token is required for authorization");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyToken(req, res, next) {
    const bearerToken = req.headers["authorization"];
    const bearer = bearerToken.split(" ");
    const token = bearer[1];
    if (!token) {
        return res.status(403).send("A token is required for authorization");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        console.log({err});
        return res.status(401).send("Invalid Token");
    }
    return next();
};

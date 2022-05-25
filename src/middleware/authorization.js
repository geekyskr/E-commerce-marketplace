import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import bunyan from "bunyan";
var log = bunyan.createLogger({name: "authorization"});

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
    log.info("verified token received from ", req.user.userId);
    return next();
};

export function verifyBuyer(req, res, next) {
    const user = req.user;
    if(user.userType != "Buyer") {
        return res.status(403).send("Only Buyer can access this resource");
    }
    log.info(req.user.userId, " is verified " + user.userType + " to access this resource");
    return next();
}

export function verifySeller(req, res, next) {
    const user = req.user;
    if(user.userType != "Seller") {
        return res.status(403).send("Only Seller can access this resource");
    }
    log.info(req.user.userId, " is verified " + user.userType + " to access this resource");
    return next();
}
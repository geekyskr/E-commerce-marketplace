import { createConnection } from 'mysql';
import dotenv from "dotenv";
dotenv.config();

import bunyan from "bunyan";
var log = bunyan.createLogger({name: "DB-connection"});

const mysqlConnection = createConnection({
  host: 'localhost',
  user: 'sunil',
  password: process.env.MYSQL_PASSWORD,
  database: 'EcommerceMarketplaceDB',
  multipleStatements: true
});
mysqlConnection.connect((err)=>{
  if(err){
    log.warn("error occur while connecting "+err);
    return;
  }
  log.info("connection established");
});

export default mysqlConnection;
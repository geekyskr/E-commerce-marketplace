import { createConnection } from 'mysql';
import dotenv from "dotenv";
dotenv.config();

const mysqlConnection = createConnection({
  host: 'localhost',
  user: 'sunil',
  password: process.env.MYSQL_PASSWORD,
  database: 'EcommerceMarketplaceDB',
  multipleStatements: true
});
mysqlConnection.connect((err)=>{
  if(err){
    console.error("error occur while connecting "+err);
    return;
  }
  console.log("connection established");
});

export default mysqlConnection;
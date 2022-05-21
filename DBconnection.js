import { createConnection } from 'mysql';

const mysqlConnection = createConnection({
  host: 'localhost',
  user: 'sunil',
  password: 'MysqL@3007',
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
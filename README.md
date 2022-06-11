# E-commerce-marketplace

**Schema and Table creation query -**
See: [E-commerce-marketplace/public/db-table-command](https://github.com/geekyskr/E-commerce-marketplace/blob/main/public/db-table-command)

**Payload and Response Example**
See: [E-commerce-marketplace/public/payload-response-structure](https://github.com/geekyskr/E-commerce-marketplace/blob/main/public/payload-response-structure)

**How to run this project?**
1. Clone this project and enter.
2. install all dependency by "npm i"
3. setup local mysql instance and create table by looking at E-commerce-marketplace/public/db-table-command
4. setup environment variable for JWT_SECRET_KEY and MYSQL_PASSWORD
5. do "npm run start". It will start a server at process.env.PORT || 8080 and also establish connection with mysql.
6. carefully review payload for every route here E-commerce-marketplace/public/payload-response-structure and also
expected result.

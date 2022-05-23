# E-commerce-marketplace

**Schema and Table creation query -**

CREATE SCHEMA EcommerceMarketplaceDB;
use EcommerceMarketplaceDB;
show tables;
CREATE TABLE EntityAuthInfo (
    userId CHAR(36) NOT NULL PRIMARY KEY,
    userName VARCHAR(100) UNIQUE,
    userPassword VARCHAR(100) NOT NULL,
    userType ENUM("Buyer", "Seller") NOT NULL
);

CREATE TABLE Products (
    productId CHAR(36) NOT NULL PRIMARY KEY,
    productName VARCHAR(50) NOT NULL,
    productPrice INT NOT NULL,
    userId CHAR(36) NOT NULL,
    FOREIGN KEY (userId) REFERENCES EntityAuthInfo(userId)
);

CREATE TABLE Orders (
	orderId CHAR(36) NOT NULL,
    productId CHAR(36) NOT NULL,
    sellerId CHAR(36) NOT NULL,
    buyerId CHAR(36) NOT NULL,
    FOREIGN KEY (sellerId) REFERENCES EntityAuthInfo(userId),
    FOREIGN KEY (buyerId) REFERENCES EntityAuthInfo(userId),
    FOREIGN KEY (productId) REFERENCES Products(productId),
    PRIMARY KEY (orderId, productId)
);

**Payload Example**
- Register
{
    "username": "sunil",
    "password": "ewhf834f2lA84343ui54tiu",
    "user_type": "Seller"
}

- Login
{
    "username": "sunil",
    "password": "ewhf834f2lA84343ui54tiu",
}

Below all payload will have additional req.headers["authorization"] as bearer token.

Example: bearer eyJhbGciOiJIh4n7giIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjNDI3MzE4YS04NmQ0LTQ4OGItfhayvS02ZDhiYzA5YWI0YzkiLCJ1c2VyVHlwZSI6IlNlbGxlciIsImlhdCI6MTY1MzE5NDA4MX0.e8vzWiPUm_4YvXogxgk-6dJXfzB5ntH5uhdyvbfrdxg

- Create Catalog
[["phone", 30000], ["headphone", 3000], ["earphone", 300]]

- Get SellerList
no payload require

- Get SellerCatalog
no payload requer. only sellerId in route.

- Create Order (itemIds)
[
    "5bf30b08-35ac-4529-8b1b-3713f417c5d0",
    "f41e8b15-2631-4537-9262-d508f32d1285"
]
and sellerId in route.

- Get all order
no payload require

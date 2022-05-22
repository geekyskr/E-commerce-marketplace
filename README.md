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
    userId CHAR(36) NOT NULL,
    FOREIGN KEY (userId) REFERENCES EntityAuthInfo(userId),
    FOREIGN KEY (productId) REFERENCES Products(productId),
    PRIMARY KEY (orderId, productId)
)

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
# E-commerce-marketplace

Schema and Table creation query -

CREATE SCHEMA EcommerceMarketplaceDB;
use EcommerceMarketplaceDB;
show tables;
CREATE TABLE EntityAuthInfo (
    userId CHAR(32) NOT NULL PRIMARY KEY,
    userName TINYTEXT NOT NULL,
    userPassword VARCHAR(100) NOT NULL,
    userType ENUM("Buyer", "Seller") NOT NULL
);
CREATE TABLE Products (
    productId CHAR(32) NOT NULL PRIMARY KEY,
    productName VARCHAR(50) NOT NULL,
    productPrice INT NOT NULL,
    userId CHAR(32) NOT NULL,
    FOREIGN KEY (userId) REFERENCES EntityAuthInfo(userId)
);
CREATE TABLE Orders (
	orderId CHAR(32) NOT NULL,
    productId CHAR(32) NOT NULL,
    userId CHAR(32) NOT NULL,
    FOREIGN KEY (userId) REFERENCES EntityAuthInfo(userId),
    FOREIGN KEY (productId) REFERENCES Products(productId),
    PRIMARY KEY (orderId, productId)
)
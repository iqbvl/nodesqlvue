-- ICALAN DB
use IcalanDB

-- Admin User 
CREATE TABLE AdminUser (
    ID uniqueidentifier primary key not null,
    Admin_Name nvarchar(max) not null,
	Username nvarchar(50) not null,
	Password nvarchar(100) not null,
	Status smallint not null,
    Created_Date datetime not null,
	Created_By nvarchar(50) not null,
	Updated_Date datetime null,
	Updated_By nvarchar(50) null 
);

-- Merchant
CREATE TABLE Merchants (
    ID uniqueidentifier primary key not null,
    Merchant_Name nvarchar(max) not null,
	Username nvarchar(50) not null,
	Password nvarchar(100) not null,
	Phone_No nvarchar(12) not null,
	Email_Address nvarchar(100) not null,
	Payment_Evidence nvarchar(max) null,  -- Bukti Transfer
	Status smallint not null,
	Authorized_Date datetime null,
	Authorized_By nvarchar(50) null,
    Created_Date datetime not null,
	Created_By nvarchar(50) not null,
	Updated_Date datetime null,
	Updated_By nvarchar(50) null 
);
 
-- Item's Master Categories
CREATE TABLE ItemsCategory (
    ID uniqueidentifier primary key not null, 
    Category_Name nvarchar(max)not null,  -- Bukti Transfer
	Status smallint not null, -- Record Status
    Created_Date datetime not null,
	Created_By nvarchar(50) not null,
	Updated_Date datetime null,
	Updated_By nvarchar(50) null 
);

-- Master Items
CREATE TABLE Items (
    ID uniqueidentifier primary key not null, 
	Item_Category_ID uniqueidentifier not null, 
    Item_Name nvarchar(max)not null,  -- Bukti Transfer
	Quantity int not null, 
	Status smallint not null, -- Record Status
    Created_Date datetime not null,
	Created_By nvarchar(50) not null,
	Updated_Date datetime null,
	Updated_By nvarchar(50) null 
);

-- Items Detail
CREATE TABLE ItemsDetail (
    ID uniqueidentifier primary key not null, 
	Item_ID uniqueidentifier not null,  
	Barcode_No nvarchar(max) not null, 
	Price decimal not null, 
	Status smallint not null, -- Record Status
    Created_Date datetime not null,
	Created_By nvarchar(50) not null,
	Updated_Date datetime null,
	Updated_By nvarchar(50) null 
); 

-- Items Transactions
CREATE TABLE ItemsTransaction(
    ID uniqueidentifier primary key not null, 
	Item_Detail_ID uniqueidentifier not null, 
	Transaction_Date datetime not null,     
	Price decimal not null, 
    Created_Date datetime not null,
	Created_By nvarchar(50) not null,
	Updated_Date datetime null,
	Updated_By nvarchar(50) null 
);

--DROP TABLE IF EXISTS Merchants;
--DROP TABLE IF EXISTS MerchantsActivation;
--DROP TABLE IF EXISTS ItemsTransaction;
--DROP TABLE IF EXISTS ItemsTransactionDetail;
--DROP TABLE IF EXISTS Items;
--DROP TABLE IF EXISTS ItemsDetail;
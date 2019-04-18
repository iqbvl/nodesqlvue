-- ICALAN DB
USE IcalanDB

DROP TABLE IF EXISTS AdminUser;
DROP TABLE IF EXISTS Merchants; 
DROP TABLE IF EXISTS ItemsTransaction; 
DROP TABLE IF EXISTS Items;
DROP TABLE IF EXISTS ItemsDetail;
DROP TABLE IF EXISTS ItemsCategory;
DROP TABLE IF EXISTS AppConfig;

-- Admin User 
CREATE TABLE AdminUser (
    ID uniqueidentifier primary key not null,
    AdminName nvarchar(300) not null,
	Username nvarchar(50) not null,
	Password nvarchar(100) not null,
	Status smallint not null,
    CreatedDate datetime not null,
	CreatedBy nvarchar(50) not null,
	UpdatedDate datetime null,
	UpdatedBy nvarchar(50) null 
);

-- Merchant
CREATE TABLE Merchants (
    ID uniqueidentifier primary key not null,
    MerchantName nvarchar(300) not null,
	Username nvarchar(50) not null,
	Password nvarchar(100) not null,
	PhoneNo nvarchar(12) not null,
	EmailAddress nvarchar(100) not null,
	PaymentEvidence nvarchar(max) null,  -- Bukti Transfer
	Status smallint not null,
	AuthorizedDate datetime null,
	AuthorizedBy nvarchar(50) null,
    CreatedDate datetime not null,
	CreatedBy nvarchar(50) not null,
	UpdatedDate datetime null,
	UpdatedBy nvarchar(50) null 
);
 
-- Item's Master Categories
CREATE TABLE ItemsCategory (
    ID uniqueidentifier primary key not null, 
    CategoryName nvarchar(300)not null,  -- Bukti Transfer
	Status smallint not null, -- Record Status
    CreatedDate datetime not null,
	CreatedBy nvarchar(50) not null,
	UpdatedDate datetime null,
	UpdatedBy nvarchar(50) null 
);

-- Master Items
CREATE TABLE Items (
    ID uniqueidentifier primary key not null, 
	ItemCategoryID uniqueidentifier not null, 
    ItemName nvarchar(300)not null,  -- Bukti Transfer
	Quantity int not null, 
	Status smallint not null, -- Record Status
    CreatedDate datetime not null,
	CreatedBy nvarchar(50) not null,
	UpdatedDate datetime null,
	UpdatedBy nvarchar(50) null 
);

-- Items Detail
CREATE TABLE ItemsDetail (
    ID uniqueidentifier primary key not null, 
	ItemID uniqueidentifier not null,  
	BarcodeNo nvarchar(100) not null, 
	Price decimal not null, 
	Status smallint not null, -- Record Status
    CreatedDate datetime not null,
	CreatedBy nvarchar(50) not null,
	UpdatedDate datetime null,
	UpdatedBy nvarchar(50) null 
); 

-- Items Transactions
CREATE TABLE ItemsTransaction(
    ID uniqueidentifier primary key not null, 
	ItemDetailID uniqueidentifier not null, 
	TransactionDate datetime not null,     
	Price decimal not null, 
    CreatedDate datetime not null,
	CreatedBy nvarchar(50) not null,
	UpdatedDate datetime null,
	UpdatedBy nvarchar(50) null 
);

go

-- Insert AdminUser
INSERT into AdminUser VALUES (newid(),	'Iqbal Abdurrahman','superadmin@icalan.com','icalan.superadmin',2, GETDATE(),'System', NULL,	NULL)
create database prj

use prj

CREATE TABLE CUSTOMER (

CustomerId INT PRIMARY KEY IDENTITY(400,1),
FirstName VARCHAR(20),
LastName VARCHAR(20),
Address VARCHAR(50),
EmailId VARCHAR(50),
PhoneNumber VARCHAR(50),
DateOFBirth DATE
)

CREATE TABLE ACCOUNT (

AccountId INT PRIMARY KEY IDENTITY(5000,2),
CustomerId INT REFERENCES CUSTOMER(CustomerId),
AccountType VARCHAR(20),
Balance DECIMAL (20,2),
CardNo VARCHAR(12),
PIN VARCHAR(200),
City VARCHAR(20)
)

CREATE TABLE TRANSACTIONHISTORY (

TransactionId INT PRIMARY KEY IDENTITY(1,1),
DebitorId INT REFERENCES ACCOUNT(AccountId),
CreditorId INT REFERENCES ACCOUNT(AccountId),
Amount DECIMAL (20,2),
TransactionDate DATETIME,

)

INSERT INTO CUSTOMER VALUES ('AKASH','PANDEY','H.N0 45,HYDERABAD,TELANGANA','akashpandey@gmail.com','4323432785','2000-09-11')
INSERT INTO CUSTOMER VALUES ('ALOK','PANDEY','H.N0 56,RAI DURG,HYDERABAD,TELANGANA','alokpandey@gmail.com','7643212341','2001-10-11')
INSERT INTO CUSTOMER VALUES ('AKHIL','SHUKLA','H.N0 14,GACHIBOWLI,HYDERABAD,TELANGANA','akhilshukla@gmail.com','678324212','2000-12-11')
INSERT INTO CUSTOMER VALUES ('AKASH','SHUKLA','H.N0 55,HYDERABAD,TELANGANA','akashshukla@gmail.com','5432123565','2002-09-11')

SELECT * FROM CUSTOMER

INSERT INTO ACCOUNT VALUES(400,'SAVINGS',4589999.25,'643276387563',2343,'HYDERABAD')
INSERT INTO ACCOUNT VALUES(401,'CURRENT',999.25,'387563276538',1643,'HYDERABAD')
INSERT INTO ACCOUNT VALUES(402,'SAVINGS',12999.25,'643212347563',2343,'HYDERABAD')

SELECT * FROM ACCOUNT



select * FROM TRANSACTIONHISTORY 



CREATE TABLE CREDENTIALS ( 
UserID VARCHAR(10) Primary key,
Password VARCHAR(200),
CustomerId INT REFERENCES CUSTOMER(CustomerId),
IsEnabled BIT
)

insert into CREDENTIALS values('admin','3E398B13713712AF04C1E9E0D3D5A657B431DEC8EAFC568F063A473498C2B653:E7708DE1F8FB415F571A0ADBCA21B45B:50000:SHA256',NULL,1);

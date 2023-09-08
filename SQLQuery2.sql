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
PIN INT,
City VARCHAR(20)
)

CREATE TABLE TRANSACTIONHISTORY (

TransactionId INT PRIMARY KEY IDENTITY(1,1),
AccountId INT REFERENCES ACCOUNT(AccountId),
TransactionDate DATETIME,
AmountWithdrawn DECIMAL (20,2),

)

INSERT INTO CUSTOMER VALUES ('AKASH','PANDEY','H.N0 45,HYDERABAD,TELANGANA','akashpandey@gmail.com','4323432785','2000-09-11')
INSERT INTO CUSTOMER VALUES ('ALOK','PANDEY','H.N0 56,RAI DURG,HYDERABAD,TELANGANA','alokpandey@gmail.com','7643212341','2001-10-11')
INSERT INTO CUSTOMER VALUES ('AKHIL','SHUKLA','H.N0 14,GACHIBOWLI,HYDERABAD,TELANGANA','akhilshukla@gmail.com','678324212','2000-12-11')
INSERT INTO CUSTOMER VALUES ('AKASH','SHUKLA','H.N0 55,HYDERABAD,TELANGANA','akashshukla@gmail.com','5432123565','2002-09-11')

SELECT * FROM CUSTOMER

INSERT INTO ACCOUNT VALUES(400,'SAVINGS',4589999.25,'643276387563',2343,'HYDERABAD','2023-09-23')
INSERT INTO ACCOUNT VALUES(401,'CURRENT',999.25,'387563276538',1643,'HYDERABAD','2023-11-23')
INSERT INTO ACCOUNT VALUES(402,'SAVINGS',12999.25,'643212347563',2343,'HYDERABAD','2023-09-23')

SELECT * FROM ACCOUNT



INSERT INTO TRANSACTIONHISTORY VALUES (5000,'2023-09-08 10:12:23',10000);
UPDATE ACCOUNT SET Balance = (Balance - (SELECT top 1 AmountWithdrawn from TRANSACTIONHISTORY where AccountId =5000 order by TransactionId DESC)) where AccountId =5000

INSERT INTO TRANSACTIONHISTORY VALUES (5002,'2023-09-08 10:12:23',100);
UPDATE ACCOUNT SET Balance = (Balance - (SELECT top 1 AmountWithdrawn from TRANSACTIONHISTORY where AccountId =5002 order by TransactionId DESC)) where AccountId =5002

select * FROM TRANSACTIONHISTORY 


CREATE TABLE ADMIN ( UserName VARCHAR(20),
Password VARCHAR(20),
Email VARCHAR(20))
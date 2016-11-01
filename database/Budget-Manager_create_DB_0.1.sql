use Budget;

-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2016-10-08 14:06:42.451

-- tables
-- Table: Account
CREATE TABLE Account (
    Account_id int NOT NULL AUTO_INCREMENT,
    AccountName varchar(500) NOT NULL,
    User_id int NOT NULL,
    StartDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    EndDate datetime NULL,
    CONSTRAINT PK_Account_id PRIMARY KEY (Account_id)
);

-- Table: BudgetSubType
CREATE TABLE BudgetSubType (
    BudgetSubType_id int NOT NULL AUTO_INCREMENT,
    BudgetSubType varchar(500) NOT NULL,
    BudgetType_id int NOT NULL,
    StartDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    EndDate datetime NULL,
    CONSTRAINT PK_BudgetSubType_id PRIMARY KEY (BudgetSubType_id)
);

-- Table: BudgetType
CREATE TABLE BudgetType (
    BudgetType_id int NOT NULL AUTO_INCREMENT,
    BudgetType varchar(500) NOT NULL,
    User_id int NOT NULL,
    StartDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    EndDate datetime NULL,
    CONSTRAINT PK_BudgetType_id PRIMARY KEY (BudgetType_id)
);

-- Table: ErrorLog
CREATE TABLE ErrorLog (
    ErrorLog_id int NOT NULL AUTO_INCREMENT,
    User_id int,
    Message varchar(10000),
    Stack varchar(10000), 
    ErrorType varchar(500), 
    LogTime datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_ErrorLog_id PRIMARY KEY (ErrorLog_id)
);

-- Table: FileUpload
CREATE TABLE FileUpload (
    FileUpload_id int NOT NULL AUTO_INCREMENT,
    FileName varchar(500) NOT NULL,
    UploadTime datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FileLastEditTime datetime NULL,
    User_id int NOT NULL,
    Account_id int NOT NULL,
    CONSTRAINT PK_FileUpload_id PRIMARY KEY (FileUpload_id)
);

-- Table: FileUploadContents
CREATE TABLE FileUploadContents (
    FileUploadContents_id int NOT NULL AUTO_INCREMENT,
    Date date NOT NULL,
    Ammount numeric(10,2) NOT NULL,
    Description varchar(500) NOT NULL,
    FileUpload_id int NOT NULL,
    CONSTRAINT PK_FileUploadContents_id PRIMARY KEY (FileUploadContents_id)
);

-- Table: Ledger
CREATE TABLE Ledger (
   Ledger_id int NOT NULL AUTO_INCREMENT,
   Date Date NOT NULL,
   Ammount numeric(10,2) NOT NULL,
   Description varchar(500) NOT NULL,
   UserDescription varchar(500) NULL,
   Split int NOT NULL DEFAULT 1, 
   FileUploadContents_id int NOT NULL,
   User_id int NOT NULL,
   Account_id int NOT NULL,
   BudgetType_id int NOT NULL,
   BudgetSubType_id int NOT NULL,
   StartDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
   EndDate datetime NULL,
   UpdateDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   CONSTRAINT PK_Ledger_id PRIMARY KEY (Ledger_id)
);

-- Table: Mapping
CREATE TABLE Mapping (
   Mapping_id int NOT NULL AUTO_INCREMENT,
   Mapping varchar(500) NOT NULL,
   MapTo varchar(500) NOT NULL,
   BudgetType_id int NOT NULL DEFAULT 1,
   BudgetSubType_id int NOT NULL DEFAULT 1,
   User_id int NOT NULL,
   StartDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
   EndDate datetime NULL,
   CONSTRAINT PK_Mapping_id PRIMARY KEY (Mapping_id)
);

-- Table: Users
CREATE TABLE Users (
    User_id int NOT NULL AUTO_INCREMENT,
    UserName varchar(500) NOT NULL,
    FirstName varchar(500) NULL,
    LastName varchar(500) NULL,
    Email varchar(500) NOT NULL,
    Role_id int NOT NULL,
    StartDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    EndDate datetime NULL,
    CONSTRAINT PK_User_id PRIMARY KEY (User_id)
);

-- views
-- View: vw_BudgetType
CREATE VIEW vw_BudgetType AS
Select BT.BudgetType_id
     ,BT.BudgetType
        ,BST.BudgetSubType_id
        ,BST.BudgetSubType
        ,BT.User_id
from BudgetType BT 
left join BudgetSubType BST on BT.BudgetType_id = BST.BudgetType_id
where BT.EndDate is null
      and BST.EndDate is null
order by BT.User_id, BT.BudgetType, BST.BudgetSubType;

-- View: vw_Ledger
CREATE VIEW vw_Ledger AS
select L.Ledger_id
        ,L.Date
        ,CONCAT(YEAR(L.Date),'-', LEFT(MONTHNAME(L.Date),3)) as YearMonth        
        ,L.Ammount
        ,IFNULL(L.UserDescription, L.Description) as Description
	      ,L.Description as UploadedDescription
        ,A.AccountName
        ,BT.BudgetType
        ,BST.BudgetSubType
        ,L.Split
        ,FU.FileName
        ,FU.UploadTime
        ,L.User_id 

from Ledger L
inner join BudgetType BT on BT.BudgetType_id = L.BudgetType_id
left join BudgetSubType BST on BST.BudgetSubType_id = L.BudgetSubType_id 
inner join Account A on A.account_id = L.Account_id
inner join FileUploadContents FUC on FUC.FileUploadContents_id = L.FileUploadContents_id
inner join FileUpload FU on FU.FileUpload_id = FUC.FileUpload_id
WHERE L.EndDate is null
order by L.User_id, L.Description, L.Ammount;



-- foreign keys
-- Reference: FK_Account_Ledger (table: Ledger)
ALTER TABLE Ledger ADD CONSTRAINT FK_Account_Ledger FOREIGN KEY FK_Account_Ledger (Account_id)
    REFERENCES Account (Account_id);

-- Reference: FK_BudgetSubType_BudgetType (table: BudgetSubType)
ALTER TABLE BudgetSubType ADD CONSTRAINT FK_BudgetSubType_BudgetType FOREIGN KEY FK_BudgetSubType_BudgetType (BudgetType_id)
    REFERENCES BudgetType (BudgetType_id);

-- Reference: FK_BudgetSubType_Ledger (table: Ledger)
ALTER TABLE Ledger ADD CONSTRAINT FK_BudgetSubType_Ledger FOREIGN KEY FK_BudgetSubType_Ledger (BudgetSubType_id)
    REFERENCES BudgetSubType (BudgetSubType_id);

-- Reference: FK_BudgetType_Ledger (table: Ledger)
ALTER TABLE Ledger ADD CONSTRAINT FK_BudgetType_Ledger FOREIGN KEY FK_BudgetType_Ledger (BudgetType_id)
    REFERENCES BudgetType (BudgetType_id);

-- Reference: FK_FileUploadContents_Ledger (table: Ledger)
ALTER TABLE Ledger ADD CONSTRAINT FK_FileUploadContents_Ledger FOREIGN KEY FK_FileUploadContents_Ledger (FileUploadContents_id)
    REFERENCES FileUploadContents (FileUploadContents_id);

-- Reference: FK_FileUpload_FileUploadContents (table: FileUploadContents)
ALTER TABLE FileUploadContents ADD CONSTRAINT FK_FileUpload_FileUploadContents FOREIGN KEY FK_FileUpload_FileUploadContents (FileUpload_id)
    REFERENCES FileUpload (FileUpload_id);

-- Reference: FK_FileUpload_Users (table: FileUpload)
ALTER TABLE FileUpload ADD CONSTRAINT FK_FileUpload_Users FOREIGN KEY FK_FileUpload_Users (User_id)
    REFERENCES Users (User_id);

-- Reference: FK_Users_Ledger (table: Ledger)
ALTER TABLE Ledger ADD CONSTRAINT FK_Users_Ledger FOREIGN KEY FK_Users_Ledger (User_id)
    REFERENCES Users (User_id);

insert into Users(UserName, FirstName, LastName, Email, Role_id)
values('HenryAdmin', 'Henry', 'Munro', 'HenryMunro73@gmail.com',1);

insert into BudgetType(BudgetType, User_id)
values ('Other', 1);

insert into BudgetSubType(BudgetSubType, BudgetType_id)
values('Other', 1);

insert into Account(AccountName, User_id)
values('Natwest', 1);

-- End of file.

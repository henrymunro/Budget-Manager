use Budget;
/* #############  File Loading ############# */

DROP PROCEDURE IF EXISTS sp_SaveNewFile;
DELIMITER //
CREATE PROCEDURE sp_SaveNewFile(
	in fileName varchar(500),
	in fileLastEditTime datetime,
	in user_id_in int, 
	in user_account_id_in int
)
BEGIN


  INSERT INTO FileUpload(FileName, FileLastEditTime, User_id, Account_id)
  	SELECT fileName, fileLastEditTime, user_id_in, Account_id
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as UserAccount_id
				,Account_id
				,@prev_value := User_id
		FROM Account,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in and EndDate is null
		ORDER BY User_id, Account_id
		) subquery
	WHERE UserAccount_id = user_account_id_in;


  SELECT LAST_INSERT_ID() as ID; 

END //
DELIMITER ;



DROP PROCEDURE IF EXISTS sp_SaveNewFileContent;
DELIMITER //
CREATE PROCEDURE sp_SaveNewFileContent(
	in date date, 
	in ammount numeric(10,2),
	in description varchar(500),
	in fileUpload_id int
)
BEGIN
  INSERT INTO FileUploadContents(Date, Ammount, Description, FileUpload_id)
  VALUES (date, ammount, description, fileUpload_id);
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_AddEntriesToLedger;
DELIMITER //
CREATE PROCEDURE sp_AddEntriesToLedger(
	in fileUpload_id_in int
)
BEGIN
	
	INSERT INTO Ledger(Date
						,Ammount
						,Description
						,UserDescription
						,FileUploadContents_id
						,User_id
						,Account_id
						,BudgetType_id
						,BudgetSubType_id
						)
	SELECT FUC.Date 
			,FUC.Ammount
			,FUC.Description
			,fn_getMappedValue(FUC.Description, FU.User_id)
			,FUC.FileUploadContents_id
			,FU.User_id
			,FU.Account_id
			,IFNULL(fn_getMappedBudgetType(FUC.Description, FU.User_id), 1)
			,IFNULL(fn_getMappedBudgetSubType(FUC.Description, FU.User_id),1)
	FROM FileUpload FU 
	INNER JOIN FileUploadContents FUC on FU.fileUpload_id = FUC.fileUpload_id
	WHERE FU.FileUpload_id = fileUpload_id_in; 

END //
DELIMITER ;
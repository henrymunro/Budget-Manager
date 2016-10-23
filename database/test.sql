
use Budget;

/* #############  File Loading ############# */

DROP PROCEDURE IF EXISTS sp_SaveNewFile;
DELIMITER //
CREATE PROCEDURE sp_SaveNewFile(
	in fileName varchar(500),
	in fileLastEditTime datetime,
	in user_id int, 
	in account_id int
)
BEGIN
  INSERT INTO FileUpload(FileName, FileLastEditTime, User_id, Account_id)
  VALUES(fileName, fileLastEditTime, user_id, account_id);

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

/* ################## View tables ################ */

DROP PROCEDURE IF EXISTS sp_GetUserMappings;
DELIMITER //
CREATE PROCEDURE sp_GetUserMappings(
	in user_id_in int
)
BEGIN
	
	SELECT subquery.UserMapping_id, subquery.Mapping, subquery.MapTo, BT.BudgetType, BST.BudgetSubType
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as UserMapping_id
				,Mapping_id
				,Mapping
				,MapTo
				,BudgetType_id
				,BudgetSubType_id
				,@prev_value := User_id
		FROM Mapping,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in and EndDate is null
		ORDER BY User_id, Mapping_id
		) subquery
	LEFT JOIN BudgetType BT on BT.BudgetType_id = subquery.BudgetType_id
	LEFT JOIN BudgetSubType BST on BST.BudgetSubType_id = subquery.BudgetSubType_id
	ORDER BY UserMapping_id;
	
END //
DELIMITER ;



DROP PROCEDURE IF EXISTS sp_DeleteUserMapping;
DELIMITER //
CREATE PROCEDURE sp_DeleteUserMapping(
	in userMapping_id_in int,
	in user_id_in int
)
BEGIN
	
	SELECT @Mapping_id_cease:=  Mapping_id
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as UserMapping_id
				,Mapping_id
				,Mapping
				,MapTo
				,@prev_value := User_id
		FROM Mapping,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in and EndDate is null
		ORDER BY User_id, Mapping_id
		) subquery
	WHERE UserMapping_id = userMapping_id_in;

	UPDATE Mapping
	SET EndDate = CURRENT_TIMESTAMP
	WHERE Mapping_id = @Mapping_id_cease and User_id = user_id_in;
	
END //
DELIMITER ;




DROP PROCEDURE IF EXISTS sp_AddNewUserMapping;
DELIMITER //
CREATE PROCEDURE sp_AddNewUserMapping(
	in mapping varchar(500),
	in mapTo varchar(500),
	in user_id int
)
BEGIN
	INSERT INTO Mapping(Mapping, MapTo, User_id, BudgetType_id, BudgetSubType_id)
	VALUES(mapping, mapTo, user_id, 1, 1);
	
END //
DELIMITER ;


-- Function that returns the mappings for a given input 
DROP FUNCTION IF EXISTS fn_getMappedValue;
DELIMITER //
CREATE FUNCTION fn_getMappedValue 
  	(description_in varchar(500), user_id_in int) RETURNS varchar(500) 
BEGIN 

	DECLARE outPut varchar(500);

	SELECT MapTo INTO outPut
	FROM Mapping 
	WHERE description_in LIKE CONCAT('%', Mapping, '%')
	AND User_id = user_id_in
	AND EndDate is null
	ORDER BY Mapping_id
	LIMIT 1; 

	RETURN outPut; 

END //
DELIMITER ;

-- Function that returns the mapped BudgetType for a given input 
DROP FUNCTION IF EXISTS fn_getMappedBudgetType;
DELIMITER //
CREATE FUNCTION fn_getMappedBudgetType 
  	(description_in varchar(500), user_id_in int) RETURNS varchar(500) 
BEGIN 

	DECLARE outPut varchar(500);

	SELECT BudgetType_id INTO outPut
	FROM Mapping 
	WHERE description_in LIKE CONCAT('%', Mapping, '%')
	AND User_id = user_id_in
	AND EndDate is null
	ORDER BY Mapping_id
	LIMIT 1; 

	RETURN outPut; 

END //
DELIMITER ;

-- Function that returns the mapped BudgetSubType for a given input 
DROP FUNCTION IF EXISTS fn_getMappedBudgetSubType;
DELIMITER //
CREATE FUNCTION fn_getMappedBudgetSubType 
  	(description_in varchar(500), user_id_in int) RETURNS varchar(500) 
BEGIN 

	DECLARE outPut varchar(500);

	SELECT BudgetSubType_id INTO outPut
	FROM Mapping 
	WHERE description_in LIKE CONCAT('%', Mapping, '%')
	AND User_id = user_id_in
	AND EndDate is null
	ORDER BY Mapping_id
	LIMIT 1; 

	RETURN outPut; 

END //
DELIMITER ;
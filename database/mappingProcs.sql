use Budget;

/*   ###############   View  ############### */
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



/* ###################### Update ########################## */

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


DROP PROCEDURE IF EXISTS sp_UpdateMappingType;
DELIMITER //
CREATE PROCEDURE sp_UpdateMappingType(
	in user_id_in int,
	in budgetType_in varchar(500),
	in budgetSubType_in varchar(500),
	in user_mapping_id_in int
)
BEGIN
	
	SELECT @Mapping_id :=Mapping_id
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
	WHERE UserMapping_id = user_mapping_id_in;

	UPDATE Mapping M
	INNER JOIN BudgetType BT on BT.BudgetType = budgetType_in and BT.User_id = user_id_in
	INNER JOIN BudgetSubType BST on BST.BudgetType_id = BT.BudgetType_id and BST.BudgetSubType = budgetSubType_in
	SET M.BudgetType_id = BT.BudgetType_id, M.BudgetSubType_id = BST.BudgetSubType_id 
	WHERE Mapping_id = @Mapping_id;


END //
DELIMITER ;


/* ######################### Apply Mappings to non updated entries ####################### */ 

DROP PROCEDURE IF EXISTS sp_ApplyMappings;
DELIMITER //
CREATE PROCEDURE sp_ApplyMappings(
	in user_id_in int,
	in onlyApplyToNewEntries int
)
BEGIN
	
	IF onlyApplyToNewEntries = 1 THEN 
		UPDATE Ledger 
		SET UserDescription = fn_getMappedValue(Description, User_id)	
			,BudgetType_id 	= IFNULL(fn_getMappedBudgetType(Description, User_id), 1)
			,BudgetSubType_id = IFNULL(fn_getMappedBudgetSubType(Description, User_id),1)
		WHERE User_id = user_id_in
			AND UserDescription is null;
	END IF;

	IF onlyApplyToNewEntries = 0 THEN 
		UPDATE Ledger 
		SET UserDescription = fn_getMappedValue(Description, User_id)	
			,BudgetType_id 	= IFNULL(fn_getMappedBudgetType(Description, User_id), 1)
			,BudgetSubType_id = IFNULL(fn_getMappedBudgetSubType(Description, User_id),1)
		WHERE User_id = user_id_in;
	END IF;

END //
DELIMITER ;


/* ######################### Functions ####################### */ 

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
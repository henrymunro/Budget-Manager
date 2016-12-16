use Budget;

/*   ###############   View  ############### */
DROP PROCEDURE IF EXISTS sp_GetUserMappings;
DELIMITER //
CREATE PROCEDURE sp_GetUserMappings(
	in user_id_in int
)
BEGIN
	
	SELECT subquery.UserMapping_id, subquery.Mapping, subquery.MapTo, BT.BudgetType, BST.BudgetSubType, MC.MappingCount
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as UserMapping_id
				,M.Mapping_id
				,Mapping
				,MapTo
				,BudgetType_id
				,BudgetSubType_id
				,@prev_value := User_id
		FROM Mapping M,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in and EndDate is null
		ORDER BY User_id, Mapping_id
		) subquery
	LEFT JOIN (
	    	SELECT MAP.Mapping_id, count(distinct L.Ledger_id) MappingCount
			FROM Mapping MAP 
			LEFT JOIN Ledger L on MAP.MapTo = L.UserDescription and L.User_id = user_id_in 
			WHERE MAP.User_id = user_id_in
			GROUP BY MAP.Mapping_id
		) MC on MC.Mapping_id = subquery.Mapping_id
	LEFT JOIN BudgetType BT on BT.BudgetType_id = subquery.BudgetType_id
	LEFT JOIN BudgetSubType BST on BST.BudgetSubType_id = subquery.BudgetSubType_id
	ORDER BY UserMapping_id desc;

	
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS sp_TestNewMappings;
DELIMITER //
CREATE PROCEDURE sp_TestNewMappings(
	in user_id_in int,
	in testMapping_in varchar(400)
)
BEGIN
	
	/*Get mapping collisions*/ 
	SELECT Mapping, 
			MapTo,
			BT.BudgetType,
			BST.BudgetSubType
	FROM Mapping M
	LEFT JOIN BudgetType BT on BT.BudgetType_id = M.BudgetType_id
	LEFT JOIN BudgetSubType BST on BST.BudgetSubType_id = M.BudgetSubType_id
	WHERE Mapping LIKE CONCAT('%', testMapping_in, '%')
		AND M.User_id = user_id_in
		AND M.EndDate IS NULL;

	/*Get Overview Of rows hit*/ 
	SELECT count(*) as TotalCount,
			count(distinct Description) as DistinctDescriptions
	FROM Ledger 
	WHERE Description LIKE CONCAT('%', testMapping_in, '%')
		AND User_id = user_id_in
		AND EndDate IS NULL;
	
	/*Get info about rows the mapping would hit */
	IF testMapping_in = '' THEN
	   SELECT Description, 
			Count(*) as Count,
			Sum(Ammount) as Sum,
			Sum(CASE WHEN UserDescription IS NULL THEN 1 ELSE 0 END) as CountNotMapped
		FROM Ledger 
		WHERE Description LIKE CONCAT('%', testMapping_in, '%')
			AND User_id = user_id_in
			AND EndDate is NULL
		GROUP BY Description
		HAVING Sum(CASE WHEN UserDescription IS NULL THEN 1 ELSE 0 END) > 1
		ORDER BY Sum(CASE WHEN UserDescription IS NULL THEN 1 ELSE 0 END) DESC, SUM(Ammount) DESC		
		LIMIT 20;
	ELSE
	   SELECT Description, 
			Count(*) as Count,
			Sum(Ammount) as Sum,
			Sum(CASE WHEN UserDescription IS NULL THEN 1 ELSE 0 END) as CountNotMapped
		FROM Ledger 
		WHERE Description LIKE CONCAT('%', testMapping_in, '%')
			AND User_id = user_id_in
			AND EndDate is NULL
		GROUP BY Description
		ORDER BY Sum(CASE WHEN UserDescription IS NULL THEN 1 ELSE 0 END) DESC, SUM(Ammount) DESC
		LIMIT 20;
	END IF;
	

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
	in type varchar(500),
	in subType varchar(500),
	in user_id int
)
BEGIN

	SELECT @BudgetType_id := BudgetType_id
	FROM BudgetType
	WHERE BudgetType = type
		AND User_id = user_id;

	SELECT @BudgetSubType_id := BudgetSubType_id
	FROM BudgetType BT 
	INNER JOIN BudgetSubType BST on BT.BudgetType_id = BST.BudgetType_id
	WHERE BT.BudgetType = type
		AND BST.BudgetSubType = subType
		AND User_id = user_id;


	INSERT INTO Mapping(Mapping, MapTo, User_id, BudgetType_id, BudgetSubType_id)
	VALUES (mapping, mapTo, user_id, IFNULL(@BudgetType_id, 1), IFNULL(@BudgetSubType_id, 1));


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




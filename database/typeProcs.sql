
use Budget;

/*   ###############   View  ############### */
DROP PROCEDURE IF EXISTS sp_GetUserTypes;
DELIMITER //
CREATE PROCEDURE sp_GetUserTypes(
	in user_id_in int
)
BEGIN
	
	SELECT subquery.UserBudgetType_id, subquery.BudgetType, subquery.BudgetSubType
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as UserBudgetType_id
				,BudgetType
				,BudgetSubType
				,@prev_value := User_id
		FROM vw_BudgetType,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in 
		ORDER BY User_id, BudgetType_id, BudgetSubType_id
		) subquery
	ORDER BY subquery.BudgetType, subquery.BudgetSubType ;
	
END //
DELIMITER ;


/* ###################### Insert ###################*/

DROP PROCEDURE IF EXISTS sp_AddNewUserType;
DELIMITER //
CREATE PROCEDURE sp_AddNewUserType(
	in user_id_in int,
	in budgetType_in varchar(500)
)
BEGIN
	
	INSERT INTO BudgetType(BudgetType, User_id)
	VALUES (budgetType_in, user_id_in);

	/*Inserts a default row into sub type for each new type*/
	INSERT INTO BudgetSubType(BudgetSubType, BudgetType_id)
	VALUES ('Other',  LAST_INSERT_ID() );
	
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS sp_AddNewUserSubType;
DELIMITER //
CREATE PROCEDURE sp_AddNewUserSubType(
	in user_id_in int,
	in userBudgetType_in varchar(500),
	in subType_in varchar(500)
)
BEGIN
	
	SELECT @BudgetType_id := BudgetType_id
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as UserBudgetType_id
				,BudgetType_id
				,BudgetType
				,BudgetSubType
				,@prev_value := User_id
		FROM vw_BudgetType,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in 
		ORDER BY User_id, BudgetType_id, BudgetSubType_id
		) subquery
	WHERE BudgetType = userBudgetType_in
	LIMIT 1; 


	INSERT INTO BudgetSubType(BudgetSubType, BudgetType_id)
	VALUES (subType_in,  @BudgetType_id );
	
END //
DELIMITER ;


/* ############## cease ############### */ 


DROP PROCEDURE IF EXISTS sp_CeaseUserType;
DELIMITER //
CREATE PROCEDURE sp_CeaseUserType(
	in user_id_in int,
	in budgetType_in varchar(500)
)
BEGIN
	
	SELECT @BudgetType_id := BudgetType_id
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as UserBudgetType_id
				,BudgetType_id
				,BudgetType
				,BudgetSubType
				,@prev_value := User_id
		FROM vw_BudgetType,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in 
		ORDER BY User_id, BudgetType_id, BudgetSubType_id
		) subquery
	WHERE BudgetType = budgetType_in
	LIMIT 1; 

	UPDATE BudgetType
	SET EndDate = CURRENT_TIMESTAMP
	WHERE BudgetType_id = @BudgetType_id;

	UPDATE BudgetSubType
	SET EndDate = CURRENT_TIMESTAMP
	WHERE BudgetType_id = @BudgetType_id;
	
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS sp_CeaseUserSubType;
DELIMITER //
CREATE PROCEDURE sp_CeaseUserSubType(
	in user_id_in int,
	in subType_in varchar(500)
)
BEGIN
	
	SELECT @BudgetSubType_id := BudgetSubType_id
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as UserBudgetType_id
				,BudgetSubType_id
				,BudgetType
				,BudgetSubType
				,@prev_value := User_id
		FROM vw_BudgetType,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in 
		ORDER BY User_id, BudgetType_id, BudgetSubType_id
		) subquery
	WHERE BudgetSubType = subType_in
	LIMIT 1; 

	UPDATE BudgetSubType
	SET EndDate = CURRENT_TIMESTAMP
	WHERE BudgetSubType_id = @BudgetSubType_id;
	
END //
DELIMITER ;
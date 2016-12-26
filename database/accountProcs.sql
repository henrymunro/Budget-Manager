use Budget; 


/* #################### View ################## */

DROP PROCEDURE IF EXISTS sp_GetUserAccounts;
DELIMITER //
CREATE PROCEDURE sp_GetUserAccounts(
	in user_id_in int
)
BEGIN

	SELECT subquery.UserAccount_id, subquery.AccountName
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as UserAccount_id
				,AccountName
				,@prev_value := User_id
		FROM Account,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in and EndDate is null
		ORDER BY User_id, Account_id
		) subquery
	ORDER BY UserAccount_id;
	
END //
DELIMITER ;




/* ################## Update ################ */

DROP PROCEDURE IF EXISTS sp_AddUserAccounts;
DELIMITER //
CREATE PROCEDURE sp_AddUserAccounts(
	in account_name_in varchar(500),
	in user_id_in int
)
BEGIN
	
	INSERT INTO Account(AccountName, User_id)
	VALUES(account_name_in, user_id_in);

END //
DELIMITER ;



/* ################## Delete ################ */

DROP PROCEDURE IF EXISTS sp_DeleteUserAccounts;
DELIMITER //
CREATE PROCEDURE sp_DeleteUserAccounts(
	in userAccount_id_in int,
	in user_id_in int
)
BEGIN
	
	SELECT @account_id := subquery.Account_id
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as UserAccount_id
				,AccountName
				,Account_id
				,@prev_value := User_id
		FROM Account,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in and EndDate is null
		ORDER BY User_id, Account_id
		) subquery
	WHERE subquery.UserAccount_id = userAccount_id_in
	ORDER BY UserAccount_id;

	UPDATE Account 
	SET EndDate = CURRENT_TIMESTAMP
	WHERE Account_id = @account_id;

END //
DELIMITER ;





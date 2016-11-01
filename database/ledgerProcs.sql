use Budget;
/* #############  Gets infomation ############# */

DROP PROCEDURE IF EXISTS sp_GetLedger;
DELIMITER //
CREATE PROCEDURE sp_GetLedger(
	in user_id_in int
)
BEGIN
	
	SELECT User_Ledger_id, Date, YearMonth, Ammount, Description, UploadedDescription, AccountName, BudgetType, BudgetSubType, Split, FileName, UploadTime, Updated
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as User_Ledger_id
				, Date, YearMonth, Ammount, Description, UploadedDescription, AccountName, BudgetType, BudgetSubType, Split, FileName, UploadTime, Updated 
				, @prev_value := User_id
		FROM vw_Ledger,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in 
		ORDER BY User_id, Ledger_id
		) subquery
	ORDER BY Date desc;


END //
DELIMITER ;



DROP PROCEDURE IF EXISTS sp_GetYearMonth;
DELIMITER //
CREATE PROCEDURE sp_GetYearMonth(
	in user_id_in int
)
BEGIN
	
	SELECT YearMonth
	FROM vw_Ledger
	WHERE User_id = user_id_in
	GROUP BY YearMonth, YEAR(Date), MONTH(Date)
	ORDER BY YEAR(Date) desc, MONTH(Date) desc;


END //
DELIMITER ;



/* #######################  Updates Info ###########################*/
DROP PROCEDURE IF EXISTS sp_UpdateDescription;
DELIMITER //
CREATE PROCEDURE sp_UpdateDescription(
	in user_id_in int,
	in description_in varchar(500),
	in user_ledger_id_in int
)
BEGIN
	
	SELECT @Ledger_id := Ledger_id
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as User_Ledger_id
				, Ledger_id 
				, @prev_value := User_id
		FROM vw_Ledger,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in 
		ORDER BY User_id, Ledger_id
		) subquery
	WHERE User_Ledger_id = user_ledger_id_in;

	UPDATE Ledger 
	SET UserDescription = description_in 
	WHERE Ledger_id = @Ledger_id;


END //
DELIMITER ;


DROP PROCEDURE IF EXISTS sp_UpdateLedgerType;
DELIMITER //
CREATE PROCEDURE sp_UpdateLedgerType(
	in user_id_in int,
	in budgetType_in varchar(500),
	in budgetSubType_in varchar(500),
	in user_ledger_id_in int
)
BEGIN
	
	SELECT @Ledger_id := Ledger_id
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as User_Ledger_id
				, Ledger_id 
				, @prev_value := User_id
		FROM vw_Ledger,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in 
		ORDER BY User_id, Ledger_id
		) subquery
	WHERE User_Ledger_id = user_ledger_id_in;

	UPDATE Ledger L 
	INNER JOIN BudgetType BT on BT.BudgetType = budgetType_in and BT.User_id = user_id_in
	INNER JOIN BudgetSubType BST on BST.BudgetType_id = BT.BudgetType_id and BST.BudgetSubType = budgetSubType_in
	SET L.BudgetType_id = BT.BudgetType_id, L.BudgetSubType_id = BST.BudgetSubType_id 
	WHERE Ledger_id = @Ledger_id;


END //
DELIMITER ;



DROP PROCEDURE IF EXISTS sp_UpdateLedgerSplit;
DELIMITER //
CREATE PROCEDURE sp_UpdateLedgerSplit(
	in user_id_in int,
	in split_in int,
	in user_ledger_id_in int
)
BEGIN
	
	SELECT @Ledger_id := Ledger_id
	FROM (
		SELECT @row_num := IF(@prev_value=User_id,@row_num+1,1) as User_Ledger_id
				, Ledger_id 
				, @prev_value := User_id
		FROM vw_Ledger,
		 	(SELECT @row_num := 1) x,
	        (SELECT @prev_value := '') y
		WHERE User_id = user_id_in 
		ORDER BY User_id, Ledger_id
		) subquery
	WHERE User_Ledger_id = user_ledger_id_in;

	UPDATE Ledger L 
	SET Split = split_in
	WHERE Ledger_id = @Ledger_id;


END //
DELIMITER ;
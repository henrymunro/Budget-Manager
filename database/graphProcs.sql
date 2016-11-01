use Budget;
/* #############  Gets infomation ############# */


-- Gets user overview grouped by Type 
DROP PROCEDURE IF EXISTS sp_GetTypeOverview;
DELIMITER //
CREATE PROCEDURE sp_GetTypeOverview(
	in user_id_in int
)
BEGIN
	
	SELECT CONCAT('01-', MONTH(Date), '-', YEAR(Date)) as YearMonth, SUM(Ammount/cast(Split as decimal(4,2))) as Amount, BudgetType
	FROM vw_Ledger
	GROUP BY CONCAT('01-', MONTH(Date), '-', YEAR(Date)), YEAR(Date), MONTH(Date), BudgetType
	ORDER BY BudgetType, YEAR(Date) desc, MONTH(Date) desc;


END //
DELIMITER ;


-- Gets user overview grouped by Type 
DROP PROCEDURE IF EXISTS sp_GetSubTypeOverview;
DELIMITER //
CREATE PROCEDURE sp_GetSubTypeOverview(
	in user_id_in int,
	in budgetType_id varchar(500)
)
BEGIN
	
	SELECT CONCAT('01-', MONTH(Date), '-', YEAR(Date)) as YearMonth, SUM(Ammount/cast(Split as decimal(4,2))) as Amount, BudgetSubType as BudgetType
	FROM vw_Ledger
	WHERE BudgetType = budgetType_id
	GROUP BY CONCAT('01-', MONTH(Date), '-', YEAR(Date)), YEAR(Date), MONTH(Date), BudgetSubType
	ORDER BY BudgetSubType, YEAR(Date) desc, MONTH(Date) desc;


END //
DELIMITER ;
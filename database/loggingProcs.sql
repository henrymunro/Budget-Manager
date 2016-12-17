Use Budget; 


/* ###################### Insert ###################*/

DROP PROCEDURE IF EXISTS sp_LogError;
DELIMITER //
CREATE PROCEDURE sp_LogError(
	in user_id_in int,
	in message_in varchar(10000),
	in stack_in varchar(10000),
	in errorType_in varchar(500)
)
BEGIN
	
	INSERT INTO ErrorLog(User_id, Message, Stack, ErrorType)
	VALUES (user_id_in, message_in, stack_in, errorType_in);
	
END //
DELIMITER ;

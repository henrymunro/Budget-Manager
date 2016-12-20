use Budget;

/*   ###############   Authenticate  ############### */

DROP PROCEDURE IF EXISTS sp_AuthenticateUser;
DELIMITER //
CREATE PROCEDURE sp_AuthenticateUser(
	in username_in varchar(500),
	in password_id varchar(1000)
)
BEGIN

	SELECT User_id 
	FROM Users 
	WHERE Username = username_in 
	AND Password = password_id 
	AND EndDate is null; 

	
END //
DELIMITER ;

use Budget;

/*   ###############   Authenticate  ############### */

DROP PROCEDURE IF EXISTS sp_AuthenticateUser;
DELIMITER //
CREATE PROCEDURE sp_AuthenticateUser(
	in username_in varchar(500),
	in password_id varchar(1000)
)
BEGIN

	SELECT @User_id = User_id 
	FROM Users 
	WHERE Username = username_in 
	AND Password = password_id 
	AND EndDate is null; 

	
END //
DELIMITER ;



/*   ###############   Create user  ############### */

DROP PROCEDURE IF EXISTS sp_CreatUser;
DELIMITER //
CREATE PROCEDURE sp_CreatUser(
	in username_in varchar(500),
	in firstName_in varchar(500),
	in lastName_in varchar(500),
	in email_in varchar(500),
	in password_in varchar(1000)
)
BEGIN

	 

	IF (SELECT User_id 
	FROM Users 
	WHERE Username = username_in 
	AND EndDate is null) is not null
	THEN 
		Select 'Username already in use please pick another.' as ValidationError;
	ELSE
		INSERT INTO Users(UserName, FirstName, LastName, Email, Password, Role_id)
		SELECT username_in, firstName_in, lastName_in, email_in, password_in, 1;

		SELECT 'User Created' as Message;
	END IF; 

	
END //
DELIMITER ;

const debug = require('debug')('login')
const path = require('path')
const bcrypt = require('bcrypt');
const saltRounds = 10;


//Load in router class
const Router = require('../router')
const router = new Router().router

//Load in database connection
const pool = require('../databaseConnection')

//Load in other functions
const user = require('../globalFunctions/createNewUser')
const   { createNewUser } = user


debug('Startup: Loading in LOGIN routes')

//Route to get users mappings
router.get('/', (req, res)=>{
  debug('Request recieved to GET login page')
  res.sendFile('login.html', { root: path.join(__dirname, '../../build') })

})


// Deal with attempted user logins
router.post('/', (req, res)=>{
  const {username, password} = req.body
  debug('Request RECIEVED to authenticate user: '+username)

  // Grabs the users concatonted hash and salt from the DB
  pool.getConnection()
         .then((conn) => {
           const result = conn.query('call sp_GetUserCredentials(?)', [username])
           conn.release()
           return result;
         })
         .then((result) => {
          // Compares DB hash and salt to password sent
          const { Hash, Email, User_id } = result[0][0][0]
          debug('Checking user credentials: '+username)
          bcrypt.compare(password, Hash, function(err, passwordValid) {
              // passwordValid == true means password is valid 
              if (passwordValid){
                // User has sucessfully logged in
                debug('Request SUCCESS to authenticate user: '+username+', user_id: '+ User_id)
                // Session info
                req.session.user_id = User_id
                req.session.username = username
                console.log('SESSION: ', req.session)
                res.status(200).send({loggedIn:true, shouldRedirect:true})
              }else{
                // Incorrect username or password given
                debug('Request FAIL unable to authenticate user: '+username)
                res.send({loggedIn:false, shouldRedirect:false, errorMessage: 'Incorrect Username or password please try again'})
              }
          })
         }).catch((err)=>{
          debug('Request ERROR authenticating user: '+username+ ', error: ' +  err)
          res.send({loggedIn:false, shouldRedirect:false, errorMessage: 'Unable to authenticate user please try again'})
         })

})


// Create new user 
router.post('/create', (req, res)=>{
  const {username, firstname, lastname, email, password} = req.body
  debug('Request RECIEVED to create user: '+username)
  // bcrypt creates a salt for the user and then the hash 
  // these are then concatonated and stored in the database
  bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    createNewUser(username, firstname, lastname, email, hash).then((response)=>{
      debug('RESPONSE: ', response)
      const validationError = response.ValidationError
      if(validationError){
        debug('Request FAIL to create user: '+username + ', '+ validationError)
        res.status(200).send({message: validationError})    
      }else{
        const message = response.Message
        debug('Request SUCCESS to create user: '+username+', '+response)
        res.status(200).send({message: message})             
      }

    }).catch((error)=>{
      debug('Request ERROR create user: '+username+ ', error: ' +  error)
      res.send({message: 'Error creating user'})

    })
  })
  
})





module.exports = router;

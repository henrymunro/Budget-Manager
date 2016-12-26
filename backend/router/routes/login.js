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
const user = require('../globalFunctions/authenticateUser')
const   { authenticateUser, createNewUser } = user


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
  authenticateUser(username, password).then((response)=>{
    if(response){
      const user_id = response.User_id 
      debug('Request SUCCESS to authenticate user: '+username+', user_id: '+ user_id)
      // Session info
      req.session.user_id = user_id
      req.session.username = username
      console.log('SESSION: ', req.session)
      res.status(200).send({loggedIn:true, shouldRedirect:true})
    }else{
      debug('Request ERROR unable to authenticate user: '+username)
      res.send({loggedIn:false, shouldRedirect:false, errorMessage: 'Incorrect Username or password please try again'})
    }
    

  }).catch((error)=>{
    debug('Request ERROR authenticating user: '+username+ ', error: ' +  err)
    res.send({loggedIn:false, shouldRedirect:false, errorMessage: 'Unable to authenticate user please try again'})

  })
})


// Create new user 
router.post('/create', (req, res)=>{
  const {username, firstname, lastname, email, password} = req.body
  debug('Request RECIEVED to create user: '+username)
  // create SALT for new user
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

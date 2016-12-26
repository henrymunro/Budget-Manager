const debug = require('debug')('login')
const path = require('path')

//Load in router class
const Router = require('../router')
const router = new Router().router

//Load in database connection
const pool = require('../databaseConnection')

//Load in other functions
const user = require('../globalFunctions/authenticateUser')
const   { authenticateUser } = user


debug('Startup: Loading in LOGIN routes')

//Route to get users mappings
router.get('/', (req, res)=>{
  debug('Request recieved to GET login page')
  res.sendFile('login.html', { root: path.join(__dirname, '../../build') })

})

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



module.exports = router;

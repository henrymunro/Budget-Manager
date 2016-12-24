var express = require('express');
var router = express.Router();
const debug = require('debug')('login')
const pool = require('mysql2/promise').createPool({host:'localhost', user: 'root', database: 'Budget'}); 
const path = require('path');

const user = require('../globalFunctions/authenticateUser')
const   { authenticateUser } = user


$Client_address = 'http://localhost:8080';


router.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});

//Route to get users mappings
router.get('/', (req, res)=>{

  console.log(path.join(__dirname,'/../views/login.html'))
  res.sendFile(path.join(__dirname,'/login.html'))

})

router.post('/', (req, res)=>{
  const {username, password} = req.body
  debug('Request RECIEVED to authenticate user: '+username)
  authenticateUser(username, password).then((response)=>{
    if(response){
      const user_id = response.User_id 
      debug('Request SUCCESS to authenticate user: '+username+', user_id: ', user_id)
      //res.send({loggedIn:true, shouldRedirect:true})
      res.redirect('/home');
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

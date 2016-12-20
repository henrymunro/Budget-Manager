var express = require('express');
var router = express.Router();

const Escape = require('validator').escape
const debug = require('debug')('mappings')
const pool = require('mysql2/promise').createPool({host:'localhost', user: 'root', database: 'Budget'}); 
const path = require('path');

$Client_address = 'http://localhost:8080';


router.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', $Client_address);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});

//Route to get users mappings
router.get('/', (req, res)=>{

  console.log(path.join(__dirname,'/../views/login.html'))
  res.sendFile(path.join(__dirname,'/login.html'))

})



module.exports = router;

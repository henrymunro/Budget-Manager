var express = require('express');
var router = express.Router();
const debug = require('debug')('home')
const pool = require('mysql2/promise').createPool({host:'localhost', user: 'root', database: 'Budget'}); 
const path = require('path');


$Client_address = 'http://localhost:8080';


router.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});

//Route to get users mappings
router.get('/', (req, res)=>{

  res.sendFile('index.html', { root: path.join(__dirname, '../../static') })

})



module.exports = router;

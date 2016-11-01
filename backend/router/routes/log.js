var express = require('express');
var router = express.Router();

const debug = require('debug')('LOG')
const pool = require('mysql2/promise').createPool({host:'localhost', user: 'root', database: 'Budget'}); 

const databaseConnection = require('../globalFunctions/databaseConnection')
const   { callProcUPDATE, callProcGET } = databaseConnection

$Client_address = 'http://localhost:8080';


router.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', $Client_address);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});


//Route to log browser errors 
router.post('/browserError', (req, res)=>{
  debug('Request RECIEVED: To log browser error')
  // Gathers infromation
  let operation = 'logging browser error [user_id, message, stack, errorType] '
  const procedure = 'CALL sp_LogError( ?, ?, ?, ?);',
        user_id = 1, 
        { message, stack } = req.body,
        params = [user_id, message, stack, 'browser']
  // Updates logging text
  operation = operation + params.join(', ') 
  // Makes DB update
  callProcUPDATE(procedure, params, operation, res) 
})


module.exports = router;

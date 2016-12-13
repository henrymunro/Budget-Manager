var express = require('express');
var router = express.Router();

const Escape = require('validator').escape
const debug = require('debug')('mappings')
const pool = require('mysql2/promise').createPool({host:'localhost', user: 'root', database: 'Budget'}); 

$Client_address = 'http://localhost:8080';


router.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', $Client_address);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});


//Route to get users mappings
router.get('/', (req, res)=>{
  debug('Request to get user mappings')
pool.getConnection()
     .then((conn) => {
     	const user_id = 1 
       const res = conn.query('CALL sp_GetUserMappings( ?);', [user_id])
       conn.release()
       return res;
     })
     .then((result) => {
     	debug('GET user mappings SUCCESSFUL')
     	res.status(200).send(result[0][0])
     }).catch((err)=>{
     	debug('ERROR: ', err)
     	res.status(400).send('ERROR: ', err)
     })
})

//Route to add a new users mappings
router.post('/add', (req, res)=>{
  // Gathers infromation
  let operation = 'add user mapping [mapping, mapTo, user_id] '
  const procedure = 'CALL sp_AddNewUserMapping( ?, ?, ?);',
        user_id = 1, 
        { mapping, mapTo } = req.body,
        params = [mapping, mapTo, user_id]
  // Updates logging text
  operation = operation + params.join(', ') 
  // Makes DB update
  callProcUPDATE(procedure, params, operation, res) 
})

//Route to delete user mapping 
router.post('/delete', (req, res)=>{
   // Gathers infromation
  let operation = 'delete user mapping [userMapping_id, user_id] '
  const procedure = 'CALL sp_DeleteUserMapping( ?, ?);',
        user_id = 1, 
        { userMapping_id } = req.body,
        params = [userMapping_id, user_id]
  // Updates logging text
  operation = operation + params.join(', ') 
  // Makes DB update
  callProcUPDATE(procedure, params, operation, res) 
})


// Route to update the type/subType of a user mapping
router.post('/type', (req, res)=>{ 
  // Gathers infromation
  let operation = 'update type and subtype of mapping [user_id, budgetType, budgetSubType, userMapping_id] '
  const procedure = 'CALL sp_UpdateMappingType( ?, ?, ?, ?);',
        user_id = 1, 
        { budgetType, budgetSubType, userMapping_id } = req.body,
        params = [user_id, budgetType, budgetSubType, userMapping_id]
  // Updates logging text
  operation = operation + params.join(', ') 
  // Makes DB update
  callProcUPDATE(procedure, params, operation, res)   
})


// Route to apply mappings to existing entries
router.post('/type', (req, res)=>{ 
  // Gathers infromation
  let operation = 'apply mappings [user_id, onlyApplyToNewEntries] '
  const procedure = 'CALL sp_ApplyMappings( ?, ?);',
        user_id = 1, 
        { onlyApplyToNewEntries } = req.body,
        params = [user_id, onlyApplyToNewEntries]
  // Updates logging text
  operation = operation + params.join(', ') 
  // Makes DB update
  callProcUPDATE(procedure, params, operation, res)   
})

function callProcUPDATE(procedure, parameters, operation, res){
  debug('Request RECIEVED: '+ operation)
  pool.getConnection()
       .then((conn) => {
         const result = conn.query(procedure, parameters)
         conn.release()
         return result;
       })
       .then((result) => {
        debug('Request SUCCESS: ' + operation)
        res.status(200).send('SUCCESS')
       }).catch((err)=>{
        debug('Request ERROR: ' + operation + ', error: ' +  err)
        res.status(400).send('ERROR: '+  err)
       })
}



module.exports = router;

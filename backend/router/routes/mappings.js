const debug = require('debug')('mappings')

//Load in router class
const Router = require('../router')
const router = new Router().router

//Load in database connection
const pool = require('../databaseConnection')


debug('Startup: Loading in MAPPING routes')


//Route to get users mappings
router.get('/', (req, res)=>{
  debug('Request to get user mappings')
pool.getConnection()
     .then((conn) => {
     	const user_id = req.session.user_id 
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
  let operation = 'add user mapping [mapping, mapTo, type, subType, user_id] '
  const procedure = 'CALL sp_AddNewUserMapping( ?, ?, ?, ?, ?);',
        user_id = req.session.user_id, 
        { mapping, mapTo, type, subType } = req.body,
        params = [mapping, mapTo, type, subType, user_id]
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
        user_id = req.session.user_id, 
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
        user_id = req.session.user_id, 
        { budgetType, budgetSubType, userMapping_id } = req.body,
        params = [user_id, budgetType, budgetSubType, userMapping_id]
  // Updates logging text
  operation = operation + params.join(', ') 
  // Makes DB update
  callProcUPDATE(procedure, params, operation, res)   
})


// Route to apply mappings to existing entries
router.post('/applyMappings', (req, res)=>{ 
  // Gathers infromation
  let operation = 'apply mappings [user_id, onlyApplyToNewEntries] '
  const procedure = 'CALL sp_ApplyMappings( ?, ?);',
        user_id = req.session.user_id, 
        { onlyApplyToNewEntries } = req.body,
        params = [user_id, onlyApplyToNewEntries]
  // Updates logging text
  operation = operation + params.join(', ') 
  // Makes DB update
  callProcUPDATE(procedure, params, operation, res)   
})

// Route to test new user mappings  sp_TestNewMappings
router.post('/testMappings', (req, res)=>{ 
  // Gathers infromation
  let operation = 'test mapping [user_id, testMapping] '
  const procedure = 'CALL sp_TestNewMappings( ?, ?);',
        user_id = req.session.user_id, 
        { testMapping } = req.body,
        params = [user_id, testMapping]
  // Updates logging text
  operation = operation + params.join(', ') 
  // Makes DB update
  callProcSENDDATA(procedure, params, operation, res)   
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

function callProcSENDDATA(procedure, parameters, operation, res){
  debug('Request RECIEVED: '+ operation)
  pool.getConnection()
       .then((conn) => {
         const result = conn.query(procedure, parameters)
         conn.release()
         return result;
       })
       .then((result) => {
        debug('Request SUCCESS: ' + operation)
        res.status(200).send({ data: result[0]})
       }).catch((err)=>{
        debug('Request ERROR: ' + operation + ', error: ' +  err)
        res.status(400).send('ERROR: '+  err)
       })
}



module.exports = router;

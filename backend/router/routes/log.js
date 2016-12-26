const debug = require('debug')('LOG')

//Load in router class
const Router = require('../router')
const router = new Router().router

//Load in database connection
const databaseProcedures = require('../globalFunctions/databaseProcedures')
const   { callProcUPDATE, callProcGET } = databaseProcedures


debug('Startup: Loading in LOG routes')

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

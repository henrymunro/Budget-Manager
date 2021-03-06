const debug = require('debug')('type')

//Load in router class
const Router = require('../router')
const router = new Router().router

//Load in database connection
const pool = require('../databaseConnection')
const databaseProcedures = require('../globalFunctions/databaseProcedures')
const   { callProcUPDATE, callProcGET } = databaseProcedures


debug('Startup: Loading in TYPE routes')

//Route to get types 
router.get('/', (req, res)=> {
	const user_id = req.session.user_id 
	debug('Request recieved to get Types, user: '+user_id)
		pool.getConnection()
	     .then((conn) => {
	       const res = conn.query('CALL sp_GetUserTypes( ?);', [user_id])
	       conn.release()
	       return res;
	     })
	     .then((result) => {
	     	debug('GET Types sucessful')
	     	res.status(200).send(result[0][0])
	     }).catch((err)=>{
	     	debug('ERROR getting Types: ', err)
	     	res.status(400).send('ERROR: '+ err)
	     })

})


//Route to add a new type 
router.post('/addType', (req, res)=> {
	const user_id = req.session.user_id 
	const budgetType = req.body.budgetType
	debug('Request recieved to add new Type, user: '+user_id+', Type : '+budgetType)
		pool.getConnection()
	     .then((conn) => {
	       const res = conn.query('CALL sp_AddNewUserType( ?, ?);', [user_id, budgetType])
	       conn.release()
	       return res;
	     })
	     .then((result) => {
	     	debug('Add Type sucessful, user: '+user_id+', Type : '+budgetType)
	     	res.status(200).send(result[0][0])
	     }).catch((err)=>{
	     	debug('ERROR adding Type, user: '+user_id+', Type : '+budgetType+', '+ err)
	     	res.status(400).send('ERROR: '+ err)
	     })

})

//Route to add a new type 
router.post('/addSubType', (req, res)=> {
	const user_id = req.session.user_id 
	const budgetType = req.body.budgetType,
			budgetSubType = req.body.budgetSubType
	debug('Request recieved to add new SubType, user: '+user_id+', type: '+budgetType+ ', subtype: '+ budgetSubType)
		pool.getConnection()
	     .then((conn) => {
	       const res = conn.query('CALL sp_AddNewUserSubType( ?, ?, ?);', [user_id, budgetType, budgetSubType])
	       conn.release()
	       return res;
	     })
	     .then((result) => {
	     	debug('Add SubType sucessful, user: '+user_id+', type: '+budgetType+ ', subtype: '+ budgetSubType)
	     	res.status(200).send(result[0][0])
	     }).catch((err)=>{
	     	debug('ERROR adding SubType, user: '+user_id+', type: '+budgetType+ ', subtype: '+ budgetSubType+', '+ err)
	     	res.status(400).send('ERROR: '+ err)
	     })

})


// Route to cease a user type 
router.post('/ceaseType', (req, res)=>{ 
  // Gathers infromation
  let operation = 'cease type [user_id, budgetType] '
  const procedure = 'CALL sp_CeaseUserType( ?, ?);',
        user_id = req.session.user_id, 
        { budgetType } = req.body,
        params = [user_id, budgetType]
  // Updates logging text
  operation = operation + params.join(', ') 
  // Makes DB update
  callProcUPDATE(procedure, params, operation, res)   
})

// Route to cease a user subtype 
router.post('/ceaseSubType', (req, res)=>{ 
  // Gathers infromation
  let operation = 'cease subType [user_id, budgetSubType] '
  const procedure = 'CALL sp_CeaseUserSubType( ?, ?);',
        user_id = req.session.user_id, 
        { budgetSubType } = req.body,
        params = [user_id, budgetSubType]
  // Updates logging text
  operation = operation + params.join(', ') 
  // Makes DB update
  callProcUPDATE(procedure, params, operation, res)   
})



module.exports = router;
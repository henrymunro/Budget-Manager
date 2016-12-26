const express = require('express')
const Router = require('../router')
const router = new Router().router
const debug = require('debug')('ledger')
const pool = require('mysql2/promise').createPool({host:'localhost', user: 'root', database: 'Budget'}); 


const databaseConnection = require('../globalFunctions/databaseConnection')
const   { callProcUPDATE, callProcGET } = databaseConnection

$Client_address = 'http://localhost:8080'

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', $Client_address)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-type')
  next()
})

debug('Startup: Loading in LEDGER routes')


// Returns all the users Ledger items
router.get('/', (req, res)=>{
	debug('Request recieved to get ledger')
	pool.getConnection()
	     .then((conn) => {
	     	const user_id = 1 
	       const res = conn.query('CALL sp_GetLedger( ?);', [user_id])
	       conn.release()
	       return res;
	     })
	     .then((result) => {
	     	debug('GET Ledger sucessful')
	     	res.status(200).send(result[0][0])
	     }).catch((err)=>{
	     	debug('ERROR getting ledger: ', err)
	     	res.status(400).send('ERROR: '+ err)
	     })
})


// Gets a list of the users YearMonths used to populate drop down
router.get('/yearMonth', (req, res)=>{
	debug('Request recievd to get YearMonth')
	pool.getConnection()
	     .then((conn) => {
	     	const user_id = 1 
	       const res = conn.query('CALL sp_GetYearMonth( ?);', [user_id])
	       conn.release()
	       return res;
	     })
	     .then((result) => {
	     	debug('GET YearMonth sucessful')
	     	const send = {
	     		array:result[0][0],
	     		selectedValue:result[0][0][0].YearMonth
	     	}
	     	res.status(200).send(send)
	     }).catch((err)=>{
	     	debug('ERROR getting yearMonth: ', err)
	     	res.status(400).send('ERROR: '+ err)
	     })
})

router.post('/description', (req, res)=>{
	debug('Request recieved to update description')
	const Description = req.body.description,
			User_Ledger_id = req.body.ledger_id
	debug(Description, User_Ledger_id)
	pool.getConnection()
	     .then((conn) => {
	     	const user_id = 1 
	       const res = conn.query('CALL sp_UpdateDescription( ?, ?, ?);', [user_id, Description, User_Ledger_id])
	       conn.release()
	       return res;
	     })
	     .then((result) => {
	     	debug('Description sucessfully updated')
	     	res.status(200).send('SUCCESS')
	     }).catch((err)=>{
	     	debug('ERROR updating description: ', err)
	     	res.status(400).send('ERROR: '+ err)
	     })

})

router.post('/type', (req, res)=>{ 
	const user_id = 1 
	const BudgetType = req.body.budgetType,
			BudgetSubType = req.body.budgetSubType,
			User_Ledger_id = req.body.user_Ledger_id
	debug('Request recieved to update type [user_id, BudgetType, BudgetSubType, User_Ledger_id]' +user_id+','+ BudgetType+','+ BudgetSubType+','+ User_Ledger_id)
	pool.getConnection()
	     .then((conn) => {
	       const res = conn.query('CALL sp_UpdateLedgerType( ?, ?, ?, ?);', [user_id, BudgetType, BudgetSubType, User_Ledger_id])
	       conn.release()
	       return res;
	     })
	     .then((result) => {
	     	debug('Request SUCCESS to update type [user_id, BudgetType, BudgetSubType, User_Ledger_id]' + user_id+','+ BudgetType+','+ BudgetSubType+','+ User_Ledger_id)
	     	res.status(200).send('SUCCESS')
	     }).catch((err)=>{
	     	debug('ERROR updating description: ', err)
	     	res.status(400).send('ERROR: '+  err)
	     })

})

// Route to update the type/subType of a user mapping
router.post('/split', (req, res)=>{ 
  // Gathers infromation
  let operation = 'update ledger split [user_id, split, user_Ledger_id] '
  const procedure = 'CALL sp_UpdateLedgerSplit( ?, ?, ?);',
        user_id = 1, 
        { split, user_Ledger_id } = req.body,
        params = [user_id, split, user_Ledger_id]
  // Updates logging text
  operation = operation + params.join(', ') 
  // Makes DB update
  callProcUPDATE(procedure, params, operation, res)   
})


module.exports = router;
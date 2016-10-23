const express = require('express')
const router = express.Router()
const _ = require('lodash')
const validator = require('validator')
const Escape = validator.escape
const debug = require('debug')('ledger')
const csvParser = require('../global_functions/csvParser.js')
const parseCSV = csvParser.parseCSV
const moment = require('moment')
const pool = require('mysql2/promise').createPool({host:'localhost', user: 'root', database: 'Budget'}); 

$Client_address = 'http://localhost:8080'

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', $Client_address)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-type')
  next()
})


//Route to parse and validate files uploaded 
//Sends parsed results back to client, doens't save to DB
// router.post('/', (req, res) => {

// })

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

module.exports = router;
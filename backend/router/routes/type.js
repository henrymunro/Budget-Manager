const express = require('express')
const router = express.Router()
const _ = require('lodash')
const validator = require('validator')
const Escape = validator.escape
const debug = require('debug')('type')
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


//Route to get types 
router.get('/', (req, res)=> {
	const user_id = 1 
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
	const user_id = 1 
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
	const user_id = 1 
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



module.exports = router;
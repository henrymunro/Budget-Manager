
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var sql = require("seriate");
var cheerio = require('cheerio');
var databaseConnection = require('../global_functions/databaseConnection')
var procedures = require('../global_functions/procedures')
var executeSQL = databaseConnection.executeSQL;
var executeProc = databaseConnection.executeProc;
var constructSelect = databaseConnection.constructSelect

var executeProcParam = databaseConnection.executeProcParam;

var executeProcParamUpdate = databaseConnection.executeProcParamUpdate;



$Client_address = 'http://localhost:9000';

router.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', $Client_address);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});



router.get('/', function (req, res) {    
    executeProc(procedures.getMonthOverviewAggregate).then(function(response){
	console.log('executed proc ', procedures.getMonthOverviewAggregate);
	console.log(response)
	res.status(200).send(response);	
	}, function(err){
		console.log('ERROR: ', err.message)
	});
});

//getMonthOverviewAggregateSubType
router.post('/subType', function (req, res) {    
	console.log('executed proc ', procedures.getMonthOverviewAggregateSubType);
	var sent = req.body[0];
	console.log('1: ', sent);
	var params = {
		Type:{
		            type: sql.NVARCHAR,
		            val: sent.type
		        },               	
	}
	console.log('params: ',params)
	executeProcParam(procedures.getMonthOverviewAggregateSubType, params).then(function(response){
		// console.log('Response!!!: ', response)
		res.status(200).send(response);
	}, function(err){
		console.log('ERROR: ', err.message)
		res.status(500).send('ERROR ACCESSING DATABASE')
	});
	// res.status(200).send('Sent stuff back!');
})



module.exports = router;
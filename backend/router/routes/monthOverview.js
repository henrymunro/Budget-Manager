

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



router.get('/userMonths', function (req, res) {    
    executeProc(procedures.getUserMonths).then(function(response){
	console.log('executed proc ', procedures.getUserMonths);
	var list = constructSelect(response);
	res.status(200).send(list);	
	}, function(err){
		console.log('ERROR: ', err.message)
	});
});

router.get('/splitOptions', function (req, res) {    
    executeProc(procedures.getSplitOptions).then(function(response){
	console.log('executed proc ', procedures.getSplitOptions);
	var list = constructSelect(response);
	res.status(200).send(list);	
	}, function(err){
		console.log('ERROR: ', err.message)
	});
});



router.post('/', function(req, res){
	// console.log(req.body);
	var sentMonthYear = req.body.monthYear;	
	console.log('post recieved ', sentMonthYear);
	// console.log('1: ', sent.Description);
	var params = {
		monthYear:{
		            type: sql.NVARCHAR,
		            val: sentMonthYear
		        }             	
	}
	console.log('params: ',params)
	executeProcParam(procedures.getMonthOverview, params).then(function(response){
		// console.log('Response!!!: ', response)
		_(response).forEach(function(elm, key){
			// console.log(elm)
			if (elm.ammount < 0 ){
				elm.ammount = '-£'+(-1*Math.round(elm.ammount * 100) / 100)
			}else{
				elm.ammount = '£'+Math.round(elm.ammount * 100) / 100
			}
		})
		res.status(200).send(response);
	}, function(err){
		console.log('ERROR: ', err.message)
		res.status(500).send('ERROR ACCESSING DATABASE')
	});	
	
})



router.post('/setMonthOverview', function(req, res){
	console.log('post recieved');
	// console.log(req.body);
	var sent = req.body[0];
	// console.log('1: ', sent.Description);
	var params = {
		userDescription:{
		            type: sql.NVARCHAR,
		            val: sent.userDescription
		        },
		date:{
		            type: sql.NVARCHAR,
		            val: sent.date
		        },
		ammount:{
		            type: sql.NVARCHAR,
		            val: sent.ammount
		        },
		Type:{
		            type: sql.NVARCHAR,
		            val: sent.Type
		        },
		SubType:{
		            type: sql.NVARCHAR,
		            val: sent.SubType
		        },
		split:{
		            type: sql.NVARCHAR,
		            val: sent.split
		        },
		ID:{
		            type: sql.NVARCHAR,
		            val: sent.ID
		        },
		changeType:{
		            type: sql.NVARCHAR,
		            val: sent.changeType
		        },                	
	}
	// console.log('params: ',params)
	executeProcParamUpdate(procedures.setMonthOverview, params).then(function(response){
		// console.log('Response!!!: ', response)
		res.status(200).send(response);
	}, function(err){
		console.log('ERROR: ', err.message)
		res.status(500).send('ERROR ACCESSING DATABASE')
	});
	// res.status(200).send('Sent stuff back!');
})






module.exports = router;
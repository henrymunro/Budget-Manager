


var express = require('express');
var router = express.Router();
var _ = require('lodash');
var sql = require("seriate");
var databaseConnection = require('../global_functions/databaseConnection')
var procedures = require('../global_functions/procedures')
var executeSQL = databaseConnection.executeSQL;
var executeProc = databaseConnection.executeProc;
var loadUploadedFile  = databaseConnection.loadUploadedFile;

var executeProcParam = databaseConnection.executeProcParam;



$Client_address = 'http://localhost:9000';

router.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', $Client_address);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});

router.post('/', function(req, res){
	console.log('post recieved');
	// console.log(req.body);
	var sent = req.body;
	var now = Date.now()
	var randonSeed = Math.floor((Math.random() * 1000) + 1);
	var Load_ID = String(now) + String(randonSeed);
	// console.log('1: ', sent.Description);
	// console.log('params: ',sent)
	var query = "INSERT INTO WebBudgetLoad (Date, Description, Ammount, Load_ID)"+
	 			" SELECT date, description, ammount, @parentId FROM @children"
    var params = {
    				parentId: {
			            val: Load_ID,
			            type: sql.NVARCHAR(500)
			        },
			      	children: {
			            val: sent
			        ,
			        asTable: {
		                date: sql.NVARCHAR(50),
		                description: sql.NVARCHAR(500),
		                ammount: sql.NVARCHAR(50)
		            	}
			    	}
			    }
			    
	console.log(query)
	loadUploadedFile(query, params, Load_ID)
	.then(function(response){
		console.log('Response!!!: ', response)
		res.status(200).send(response);
	}, function(err){
		console.log('ERROR: ', err.message)
		res.status(500).send('ERROR ACCESSING DATABASE')
	});
	// res.status(200).send('Sent stuff back!');
})




// query: "INSERT INTO Children (Id, ParentId, FirstName, MiddleName) " +
//                 "SELECT id, @parentId, firstName, middleName FROM @children",
//     params: {
//        children: {
//             val: [
//                 { id: 1, firstName: "James", middleName: "Paul"},
//                 { id: 2, firstName: "John", middleName: "Winston" },
//                 { id: 3, firstName: "George", middleName: "Harold" },
//                 { id: 4, firstName: "Richard", middleName: "Parkin" }
//             ],
//             asTable: {
//                 id: sql.INT,
//                 firstName: sql.NVARCHAR(50),
//                 middleName: sql.NVARCHAR(50)
//             }
//         }


module.exports = router;
var d3 = require('d3')


var express = require('express');
var router = express.Router();

const debug = require('debug')('graph')
const pool = require('mysql2/promise').createPool({host:'localhost', user: 'root', database: 'Budget'}); 

const databaseConnection = require('../globalFunctions/databaseConnection')
const   { callProcUPDATE, callProcGET } = databaseConnection

$Client_address = 'http://localhost:8080';


router.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', $Client_address);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});


// Route to get graph data grouped by type 
router.get('/type', (req, res)=>{ 
  // Gathers infromation
  let operation = 'gets user graph data grouped by type [user_id] '
  const procedure = 'CALL sp_GetTypeOverview( ?);',
        user_id = 1
        params = [user_id]
  // Updates logging text
  operation = operation + params.join(', ') 
  debug("Request RECIEVED: "+ operation)
  // Makes DB request
  callProcGET(procedure, params, operation) 
  	.then((result)=>{
  		debug('Calculating range of data: '+ operation)
  		return calculateRangeOfData(result)  		
  	}).then((result)=>{
  		debug('Formatting data to send: '+ operation)
  		return formatDataToSend(result, 'Type')
  	}).then((result)=>{
  		debug("Sending RESULT: "+ result)
  		res.status(200).send(result)
  	})
  	.catch((err)=>{
  		debug("Error: "+ operation+ err)
  		res.status(400).send('ERROR: ' + err)
  	})
})

//sp_GetSubTypeOverview
// Route to get graph data grouped by subType for a given type
router.post('/subType', (req, res)=>{ 
  // Gathers infromation
  let operation = 'gets user graph data grouped by subType [user_id, type] '
  const procedure = 'CALL sp_GetSubTypeOverview( ?, ?);',
        user_id = 1,
        { type } = req.body
        params = [user_id, type]
  // Updates logging text
  operation = operation + params.join(', ') 
  debug("Request RECIEVED: "+ operation)
  // Makes DB request
  callProcGET(procedure, params, operation) 
  	.then((result)=>{
  		debug('Calculating range of data: '+ operation)
  		return calculateRangeOfData(result)  		
  	}).then((result)=>{
  		debug('Formatting data to send: '+ operation)
  		return formatDataToSend(result, 'SubType')
  	}).then((result)=>{
  		const send = {
  			data: result,
  			parentType: type
  		}
  		debug("Sending RESULT: "+ send)
  		res.status(200).send(send)
  	})
  	.catch((err)=>{
  		debug("Error: "+ operation+ err)
  		res.status(400).send('ERROR: ' + err)
  	})
})


function calculateRangeOfData(data){
	return new Promise((resolve, reject)=> {
		//Formats the date 
	    data.forEach(function (d) {
	        d.date = d3.timeParse("%d-%m-%Y")(d.YearMonth)
	    })
		// Works out the max and min X of each data set
		const x = d3.extent(data, function (d) {
			    return d.date;
		    })
		// Works out the max and min Y of each data set
		const y = d3.extent(data, function (d) {
		        return Number(d.Amount);
		    })
		const  extent_X = [
				d3.timeFormat("%d-%m-%Y")(x[0]),
				d3.timeFormat("%d-%m-%Y")(x[1])
				]
	           extent_Y = [y[0], y[1]]

	    resolve({ 
	    	data: data, 
	    	extent_X: extent_X,
	    	extent_Y: extent_Y
	    })

	})
}

 // Formats the data for the client side
function formatDataToSend(result, plotType){
	return new Promise((resolve, reject)=>{	
		const data = result.data
  		// Grabs the a list of the distinct types 
  		const distinctTypes = [...new Set(data.map(item => item.BudgetType))]
  		const distinctTypesShow = distinctTypes.map(el=> {return {type: el, show: true }})
  		const distinctDates = [...new Set(data.map(item => item.YearMonth))]
  		// Loops over the disctinct types 
  		const sendData = distinctTypes.map((row, key) =>{
  			let typeData = []
  			// Grabs all the entries for a given type and pushes to array 
  			const filteredType = data.filter((item)=>{
		        if (item.BudgetType === row){
		          return item
		        }
		      })
  			return {
  				data: filteredType,
  				show: true,
  				type: row,
  				plotType: plotType
  			}
  			// Formats for client side plotting
  			// sendData[row] = {data: filteredType, show:true }
  		})
  		result.data = sendData
  		result.distinctTypes = distinctTypes
  		result.distinctDates = distinctDates
  		result.distinctTypesShow = distinctTypesShow
  		resolve(result)
	})

}



module.exports = router;

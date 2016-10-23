// Provides connection to database and performs queries 


var sql = require("seriate");
var cheerio = require('cheerio');
var config = require('./config.json');
var when = require( "when" );
var trim = require('deep-trim-node');
var _ = require('lodash');

sql.setDefaultConfig( config );


function executeSQL () {
	console.log("query ecexuted!")
	sql.execute( {  
        query: "SELECT * FROM mappingtype"
    } ).then( function( results ) {
        // console.log( results );
    }, function( err ) {
        console.log( "Something bad happened:", err );
    } );
}

function executeProc(procedure){
	console.log('Proc executed: ', procedure)
	return new Promise( function(resolve,reject){
		sql.execute( {
			query:'exec ' + procedure
		}).then( function( result ) {
				result = trim(result);
				// console.log(result)
                resolve( result );
                    }            
            , function( err ) {
                reject( err );
            })
	})
};

function executeProcParamUpdate( procedure, params ){
	console.log('Proc about to be executed: ', procedure, params)
	return new Promise( function(resolve,reject){
		sql.execute({
		    procedure: procedure,
		    params: params,
		    multiple: true
		}).then( function( result ) {
				// console.log('RESULTS: ', result, 'RESULT00: ',result[0][0])
				console.log('Success: ', result[0][0])
				var sentResult = result[0][0].length + ' record updated'
                resolve( sentResult );
                    }            
            , function( err ) {
            	console.log('ERROR: ', err)
                reject( err );
            })
	})
};

function executeProcParam( procedure, params ){
	console.log('Proc about to be executed: ', procedure, params)
	return new Promise( function(resolve,reject){
		sql.execute({
		    procedure: procedure,
		    params: params,
		    multiple: true
		}).then( function( result ) {
				result = trim(result)
				console.log('RESULTS: ', result, 'RESULT00: ',result[0][0])
				// console.log(result[0][0])
                resolve( result[0][0] );
                    }            
            , function( err ) {
            	console.log('ERROR: ', err)
                reject( err );
            })
	})
};

function loadUploadedFile( query, params, Load_ID ){
	// console.log('query about to be executed: ', query)
	// return new Promise( function(resolve,reject){
	// 	sql.execute({
	// 	    query: query,
	// 	    params: params
	// 	}).then( function( result ) {
	// 			// console.log('RESULTS: ', result, 'RESULT00: ',result[0][0])
				
 //                resolve( 'sentResult' );
 //                    }            
 //            , function( err ) {
 //            	console.log('ERROR: ', err)
 //                reject( err );
 //            })
	// })
	console.log('query about to be executed: ', query, params)
	return new Promise( function(resolve,reject){
		sql.getPlainContext().step('loadInData', {
		    query: query,
		    params: params
		}).step('transferData', {
			procedure: 'spWEB_LoadUploadedFile', 
			params: {Load_ID: Load_ID}
		}).end( function( sets ){
			console.log('Duplicates: ', sets.transferData[0])			
			console.log('Loaded In: ', sets.transferData[0][1])
	    } )
	    .error( function( err ){
	        console.log( err );
	    } ).then( function( result ) {
				// console.log('RESULTS: ', result)//, 'RESULT00: ',result[0][0])
				result = [{Duplicates: result.transferData[0][0], Succesful:result.transferData[0][1][0].successfulInsert}]
                resolve( result );
                    }            
            , function( err ) {
            	console.log('ERROR: ', err)
                reject( err );
            })
	})


}



function constructSelect(data){
	// console.log('data: ', data)
	var $ = cheerio.load('<select></select>');
	// console.log('html1: ', $.html())
    _(data).forEach(function(row, key){
    	// console.log('row: ', row)
    	$('select').append($("<option></option>")
		         .attr("value",row.value)
		         .text(row.value));
    }); 
    console.log('constructing Select')
    return $.html();
}
//spWEB_LoadUploadedFile

function constructList(data){
	console.log('data: ', data)
	var $ = cheerio.load('<ul></ul>');
	// console.log('html1: ', $.html())
    _(data).forEach(function(row, key){
    	// console.log('row: ', row)
    	$('ul').append($("<li></li>")
		         .attr("value",row.value)
		         .text(row.value));
    }); 
    console.log('constructing list')
    return $.html();
}



function constructNestedList(data){
	console.log("constructing SubList")
	var output = {};
	_(data).forEach(function(elm, key){
		var Type = elm.Type;
		var Subtype = elm.Subtype;
		// console.log('ELM: ', elm.Type)
		if(output[Type]){
			output[Type].push({value: Subtype});
		}else {
			output[Type] = [{value: Subtype}];
		};
	});
	// console.log(output);
	_(output).forEach(function(elm, key){
		output[key] = constructSubList(elm, key)
	})
	output = constructOuterList(output);
	// output = cheerio.load(output).html();
	// console.log("FINISHED: ", output)
	return output;


	function constructSubList(data, Type){
		// console.log('data: ', data)
		var $ = cheerio.load('<ul type="'+Type+'" class="subTypeList"></ul>');
	    _(data).forEach(function(row, key){
	    	$('ul').append($("<li></li>")
			         .attr("value",row.value)
			         .text(row.value));
	    }); 
	    // console.log('constructing sub list')
	    return $.html();
	}

	function constructOuterList(data){
		// console.log('data: ', data)
		var $ = cheerio.load('<ul class="typeSubtypeList"></ul>');
	    _(data).forEach(function(row, key){
	    	var subListBody = key + ' ' + row
	    	// console.log("subListBody: ", subListBody)
	    	// $('ul').append($('<li value="'+key+'">'+"subListBody"+'</li>'));
	    	$('<li value="'+key+'">'+subListBody+'</li>').appendTo(".typeSubtypeList")
			         // .attr("value",key)
			         // .text(subListBody)
			         // );
	    }); 
	    // console.log('constructing sub list')
	    return $.html();
	}
}



// var query = "INSERT INTO WEBBudgetMain (Date, PrimaryDescription, Ammount)"+
// 	 			" SELECT date, description, ammount FROM @children"

// var val = [{ date: '1-3-2016',
//     description: 'TESCO STORES 3205 LONDON',
//     ammount: '17.75' }]
//   // { date: '1-4-2016',
//   //   description: 'NEXT - LONDON FENCHURCH LONDON',
//   //   ammount: '14' },
//   // { date: '1-4-2016',
//   //   description: 'NEXT - LONDON FENCHURCH LONDON',
//     // ammount: '-14' } ]
// var params = {
// 			       children: {
// 			        	val: [
// 			            	{ date: '1-3-2016', description: 'TESCO STORES 3205 LONDON', ammount: '17.75' }
// 			           	],
// 			        	asTable: {
// 			                date: sql.NVARCHAR(50),
// 			                description: sql.NVARCHAR(500),
// 			                ammount: sql.NVARCHAR(50)
// 		            	}
// 			    	}
// 			    }
// // console.log(params.children)
// // insertIntoTable( query, params )




// sql.execute( { 
//  query: "INSERT INTO WEBBudgetMain (Date, PrimaryDescription, Ammount, isVisible, user_id)"+
// 	 			" SELECT date, description, ammount, @parentId, @parentId FROM @children",
//     params: {
//         parentId: {
//             val: 1,
//             type: sql.INT
//         },
//         children: {
//         	val: [
//             	{ date: '1-3-2016', description: 'TESCO STORES 3205 LONDON', ammount: '17.75' }
//            	],
//         	asTable: {
//                 date: sql.NVARCHAR(50),
//                 description: sql.NVARCHAR(500),
//                 ammount: sql.NVARCHAR(50)
//         	}
//     	}
//     }
//   }).then( function( results ) {
//         console.log( results );
//     }, function( err ) {
//         console.log( "Something bad happened:", err );
//     } );



module.exports = {
				executeSQL: executeSQL,
				executeProc: executeProc,
				executeProcParamUpdate: executeProcParamUpdate,
				executeProcParam: executeProcParam,
				loadUploadedFile: loadUploadedFile,
				constructSelect: constructSelect,
				constructList:constructList,
				constructNestedList:constructNestedList
				};

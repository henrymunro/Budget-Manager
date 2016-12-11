const debug = require('debug')('fileUploadValidation')
const moment = require('moment')

const pool = require('mysql2/promise').createPool({host:'localhost', user: 'root', database: 'Budget'}); 	

function validateUploadedFile(file) {
	return new Promise((outerResolve, outerReject)=>{
		const fileName = file.name,
			contents = file.result.contents,
			fileLastEditTime = moment(file.lastModifiedDate).format('YYYY-MM-DD HH:mm')
			user_id = 1
		let validationCount = 0 
		debug('Validating general file information: ' + file.name)
		
		// Updates DB
		const fileInsert = pool.getConnection()
	     .then((conn) => {
	     	//Checks to see if the file already exists in FileUpload
	       return new Promise((resolve, reject)=>{
	          conn.query({sql:'CALL sp_ValidateUploadFile( ?, ?, ?);', values: [fileName, fileLastEditTime, user_id]}, (err, rows, fields)=>{
	          if(err){
	            debug('Error validating general file information: '+ fileName +' ' + err)
	            reject(err)
	          } else{
	            debug('General file information validated: ' + fileName + ' FileAlreadyUploaded: ' + rows.FileAlreadyUploaded)
	            resolve(rows[0][0].FileAlreadyUploaded)
	          }
	          conn.release()
	        })
	      }) 
	     })
	     .then((result) => {
	     	// Checks to see if any of the rows already exisit in Ledger
	      	debug('Validating the files contents: '+ fileName)
	     	const validatedRows = contents.map((row)=>{
	     		const date = row.date,
	       			ammount = row.ammount,
	       			description = row.description       		
	       		return new Promise((resolve, reject)=>{
	       			pool.query({sql: 'CALL sp_ValidateUploadFileContents( ?, ?, ?, ?);', values: [date, ammount, description, user_id]}, (err, rows, files)=>{
	       				if (err){
	                // debug('Error adding row: ', err)
	                reject(err)
	              } else {
	                // debug('File sucessfully added')
	               			debug('Row : ', rows[0][0].FileContentsAlreadyUploaded)
	                	   	row.fileContentsAlreadyUploaded = rows[0][0].FileContentsAlreadyUploaded
	                	   	validationCount = validationCount + rows[0][0].FileContentsAlreadyUploaded
	       				   	resolve()
	              }
	       			})
	       		})
	       	})
	       	return { validatedRowsPromises: validatedRows, validatedUploadFile: result}	
	     	
	     }).then((result)=>{
	     	Promise.all(result.validatedRowsPromises).then((queryRes)=>{
	     		outerResolve({ validationFailCount: validationCount, validatedUploadFileFail: result.validatedUploadFile })
	     	}).catch((err)=>{
	     		debug('ERROR validating file: ' + fileName)
	     		outerReject(err)
	     	})
	     }).catch((err)=>{
	     	debug('ERROR validating file: ' + fileName + err)
	     	outerReject(err)
	     })
	})
}



module.exports = {
  validateUploadedFile: validateUploadedFile
}



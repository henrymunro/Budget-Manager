const express = require('express')
const Router = require('../router')
const router = new Router().router
const validator = require('validator')
const Escape = validator.escape
const debug = require('debug')('fileUpload')
const csvParser = require('../globalFunctions/csvParser.js')
const parseCSV = csvParser.parseCSV
const validateUploadedFile = require('../globalFunctions/fileUploadValidation.js').validateUploadedFile
const moment = require('moment')
const pool = require('../databaseConnection')

$Client_address = 'http://localhost:8080'

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', $Client_address)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-type')
  next()
})

debug('Startup: Loading in FILE UPLOAD routes')


//Route to get users previously updated files
router.get('/', (req, res)=>{
  debug('Request to get user upload files')
pool.getConnection()
     .then((conn) => {
      const user_id = 1 
       const res = conn.query('CALL sp_GetUserUploadFiles(?);', [user_id])
       conn.release()
       return res;
     })
     .then((result) => {
      debug('GET user upload files SUCCESSFUL')
      res.status(200).send(result[0][0])
     }).catch((err)=>{
      debug('ERROR: getting upload files', err)
      res.status(400).send('ERROR: ', err)
     })
})


//Route to parse and validate files uploaded 
//Sends parsed results back to client, doens't save to DB
router.post('/', (req, res) => {
  debug('Files recieved to parse')
  const files = req.body.files
  var parsedFiles = []
  //Promise array to parse in and validate each file
  const filesPromise = files.map(function (file) {
      debug('Processing file: ' + file.name)
    return new Promise(function (resolve, reject) {
    	//Logs possible XSS
      if (file.content != Escape(file.content)) {
        debug('Input Santised: '+ file.name)
      }
      //Sanitises input
      // file.content = Escape(file.content)
      debug('Parsing file: '+ file.name)
      parseCSV(file).then(function (parsedFile) {
        // Adds required infromation from input to result
        parsedFile.name = file.name
        parsedFile.account = ''
        parsedFile.selectedAccount = 1
        parsedFile.lastModifiedDate = file.lastModifiedDate
        debug('File parsed: '+file.name)

        //Validating file contents and meta data
        debug('Validating file: '+ file.name)
        validateUploadedFile(parsedFile).then((result)=>{
          const { validationFailCount, validatedUploadFileFail } = result
          parsedFile.validationFailCount = validationFailCount
          parsedFile.validatedUploadFileFail = validatedUploadFileFail
          debug('Validated file: ' + file.name)
          parsedFiles.push(parsedFile)
          resolve()
        }).catch((err)=>{
          debug('ERROR validating file: ' + file.name + err)
        })
      }).catch(function (err) {
        debug('ERROR with file  '+file.name+': ' + err)
        reject(err)
      })
    })
  })

  Promise.all(filesPromise).then(function () {
    res.status(200).send(parsedFiles)
  }).catch(function (err) {
    debug('ERROR: ', err)
    res.status(400).send(err)
  })
})



//route for saving an uploaded file to the database
router.post('/save', (req, res)=>{
  debug('Request recieved to save file')
	const file = req.body.file,
			fileName = file.name,
			contents = file.result.contents,
			fileLastEditTime = moment(file.lastModifiedDate).format('YYYY-MM-DD HH:mm')
			account_id = file.selectedAccount,
			user_id = 1
	debug('Saving general file information: ' + file.name)
	
	// Updates DB
	const fileInsert = pool.getConnection()
     .then((conn) => {
     	//Insert files into FileUpload and return FileUpload_id
       return new Promise((resolve, reject)=>{
          conn.query({sql:'CALL sp_SaveNewFile( ?, ?, ?, ?);', values: [fileName, fileLastEditTime, user_id, account_id]}, (err, rows, fields)=>{
          if(err){
            debug('Error loading in general file information: '+ fileName +' ' + err)
            reject(err)
          } else{
            debug('General file information saved: ' + fileName)
            resolve(rows)
          }
          conn.release()
        })
      }) 
     })
     .then((result) => {
     	// Insert all rows into FileUploadContents 
     	// returns array of query promises
     	const insertedID = result[0][0]['ID']
      debug('Inserting the files contents')
     	const insertRows = contents.map((row)=>{
     		// debug('Sending row')
     		const date = row.date,
       			ammount = row.ammount,
       			description = row.description
       		return new Promise((resolve, reject)=>{
       			pool.query({sql: 'CALL sp_SaveNewFileContent( ?, ?, ?, ?);', values: [date, ammount, description, insertedID]}, (err, rows, files)=>{
       				if (err){
                // debug('Error adding row: ', err)
                reject(err)
              } else {
                // debug('File sucessfully added')
       				   resolve()
              }
       			})
       		})
       	})
       	return { insertRowsPromises: insertRows, insertedFileID: insertedID}	
     	
     }).then((results)=>{
     	// Transfers files to Ledger once all rows are inserted into FileUploadContents
     	Promise.all(results.insertRowsPromises).then((queryRes)=>{
     		debug('Transferring file: ', results.insertedFileID)
     		pool.query({sql: 'CALL sp_AddEntriesToLedger(?);', values:[results.insertedFileID]}, (err, rows, files)=>{
     			if(err){
            debug('Error transferring file: '+fileName )
            throw new Error('Error transferring file')
          }else{
            debug('Transfered file')
     			  res.status(200).send('File Uploaded!')
     		  } 
        })
      }).catch((err)=>{
     			debug('Error transferring file: ', err)     			
     			res.status(400).send('Error uploading file to database')
     		})
   

     }).catch((err)=>{
     	debug('Error: ', err)
     	res.status(400).send('Error uploading file to database')
     })

})







/*
File Upload Post:
	Recieves array of files, returns array of parsed sanitiesed files
	Input:{files: [{name:'', content:'csv ,string \n'}, ...]}
	Output:[{name:'', result:{content:[{date:'', ammount:'', description:'', errors:{}}, ...], fatalFileError:t/f}}, ...]

*/
module.exports = router



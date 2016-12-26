var express = require('express');
const Router = require('../router')
const router = new Router().router

const Escape = require('validator').escape
const debug = require('debug')('account')
const pool = require('../databaseConnection')

$Client_address = 'http://localhost:8080';




router.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', $Client_address);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});


debug('Startup: Loading in ACCOUNT routes')

//Route to get users accounts
router.get('/', (req, res)=>{
pool.getConnection()
     .then((conn) => {
     	const user_id = 1 
       const res = conn.query('CALL sp_GetUserAccounts( ?);', [user_id])
       conn.release()
       return res;
     })
     .then((result) => {
     	debug('GET Result: ', result[0][0])
     	res.status(200).send(result[0][0])
     }).catch((err)=>{
     	debug('ERROR: ', err)
     	res.status(400).send('ERROR: ', err)
     })
})

//Route to add a new users mappings
router.post('/add', (req, res)=>{
pool.getConnection()
     .then((conn) => {
     	const accountName = req.body.accountName,
     		user_id = 1
        console.log(req.body)
       const res = conn.query('CALL sp_AddUserAccounts( ?, ?);', [accountName, user_id])
       conn.release()
       return res;
     })
     .then((result) => {
     	res.status(200).send(result[0][0])
     }).catch((err)=>{
     	debug('ERROR: ', err)
     	res.status(400).send('ERROR: ', err)
     })
})

//Route to delete user account 
// router.post('/delete', (req, res)=>{
// pool.getConnection()
//      .then((conn) => {
//      	const userMapping_id = req.body.userMapping_id,
//      			user_id = 1 
//        const res = conn.query('CALL sp_DeleteUserMapping( ?, ?);', [userMapping_id, user_id])
//        conn.release()
//        return res;
//      })
//      .then((result) => {
//      	res.status(200).send(result[0][0])
//      }).catch((err)=>{
//      	debug('ERROR: ', err)
//      	res.status(400).send('ERROR: ', err)
//      })
// })

module.exports = router;
const debug = require('debug')('account')
const Escape = require('validator').escape

//Load in router class
const Router = require('../router')
const router = new Router().router

//Load in database connection
const pool = require('../databaseConnection')


debug('Startup: Loading in ACCOUNT routes')

//Route to get users accounts
router.get('/', (req, res)=>{
  debug('Request to get user accounts')
pool.getConnection()
     .then((conn) => {
     	const user_id = req.session.user_id
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
      const accountName = req.body.accountName
      const user_id = req.session.user_id
      debug('Request to get add account: '+ user_id+', '+accountName)
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
router.post('/delete', (req, res)=>{
pool.getConnection()
     .then((conn) => {
      const userAccount_id = req.body.userAccount_id
      const user_id = req.session.user_id
      debug('Request recieved to delete account, user_id: '+user_id+' , UserAccount_id: '+userAccount_id )
       const res = conn.query('CALL sp_DeleteUserAccounts( ?, ?);', [userAccount_id, user_id])
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

module.exports = router;
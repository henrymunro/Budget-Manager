const debug = require('debug')('home')
const path = require('path')

//Load in router class
const Router = require('../router')
const router = new Router().router

//Load in database connection
const pool = require('../databaseConnection')


debug('Startup: Loading in HOME routes')

//Route to get users mappings
router.get('/', (req, res)=>{
	debug('Request recieved to GET home page')
  	res.sendFile('index.html', { root: path.join(__dirname, '../../build') })

})



module.exports = router;

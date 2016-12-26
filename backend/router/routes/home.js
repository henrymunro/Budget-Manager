var express = require('express');
var Router = require('../router') //import router class 
var router = new Router().router
const debug = require('debug')('home')
const pool = require('../databaseConnection')
const path = require('path')

$Client_address = 'http://localhost:8080';

debug('Startup: Loading in HOME routes')


router.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});

//Route to get users mappings
router.get('/', (req, res)=>{
	debug('Request recieved to GET home page')
  	res.sendFile('index.html', { root: path.join(__dirname, '../../build') })

})



module.exports = router;

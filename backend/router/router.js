var express = require('express')
var session = require('client-sessions')
const debug = require('debug')('router')

debug('Startup: Loading in router')

module.exports =  class Router {
	constructor() {
    	
		var router = express.Router()
		

		// Session management 
		router.use(session({
			cookieName: 'session',
			secret: 'random_string_goes_here',
			duration: 30 * 60 * 1000,
			activeDuration: 5 * 60 * 1000,
		}))

		router.use(function(req, res, next){
		  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
		  res.header('Access-Control-Allow-Headers', 'Content-type');
		  next();
		})

		this.router = router
	}

	router(){
		return this.router
	}
}

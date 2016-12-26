var express = require('express')
var session = require('client-sessions')
const debug = require('debug')('router')

debug('Startup: Loading in router')


module.exports =  class Router {
	constructor() {
    	
		var router = express.Router()		

		router.use(function(req, res, next){
		  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
		  res.header('Access-Control-Allow-Headers', 'Content-type');
		  next();
		})

		// Session management 
	    router.use(session({
	        cookieName: 'session', // cookie name dictates the key name added to the request object
			secret: 'blargadeeblargblarg', // should be a large unguessable string
			duration: 10 * 60 * 1000, // how long the session will stay valid in ms
			activeDuration: 5 * 60 * 1000, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
	   		cookie: {
			    path: '/', // cookie will only be sent to requests under '/api'
			    //maxAge: 60000, // duration of the cookie in milliseconds, defaults to duration above
			    ephemeral: false, // when true, cookie expires when the browser closes
			    httpOnly: true, // when true, cookie is not accessible from javascript
			    //secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
			  }
	    }))


		router.use(function(req, res, next) {
			debug('Starting session checking')
			//Always allow login path
			if(req.originalUrl === '/login'){
				debug('Log in path moving on...')
				next()
			}else {
				debug('Checking user session: ', req.session)
				if(!req.session || !req.session.username){
					debug('Session expired')
					// req.session.reset()
        			res.redirect('/login')
				}else{
					debug('Session okay moving on ...')
					next()	
				}
		 	}
			
		  // if (req.session && req.session.user) {
		  //   User.findOne({ email: req.session.user.email }, function(err, user) {
		  //     if (user) {
		  //       req.user = user;
		  //       delete req.user.password; // delete the password from the session
		  //       req.session.user = user;  //refresh the session value
		  //       res.locals.user = user;
		  //     }
		  //     // finishing processing the middleware and run the route
		  //     next();
		  //   });
		  // } else {
		  //   next();
		  // }
		});

		this.router = router
	}

	router(){
		return this.router
	}
}

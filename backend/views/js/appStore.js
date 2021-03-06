import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./reducers/appReducers"


const userAuthentication = store => next => action => {
	const payload = action.payload

	// Checking to see if session has expired
	const userTimeout = (((action || {}).payload || {}).data || {}).userTimeout
	// Redirect on timeout 
	if (userTimeout) {
		console.log('AXIOS: ', userTimeout)
		window.location = "http://localhost:3000/login"
	}else{
		return next(action)
	}

}

const middleware = applyMiddleware(promise(), thunk, logger(), userAuthentication)


export default createStore(reducer, middleware)
//export default createStore(reducer, middleware, window.devToolsExtension && window.devToolsExtension()); //Devtools
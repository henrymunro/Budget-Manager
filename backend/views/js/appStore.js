import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./reducers/appReducers"


const userAuthentication = store => next => action => {
	const payload = action.payload
	console.log('Payload: ',payload, payload?'yes':'no')
	const userTimeout = payload ? payload.userTimeout : false
	console.log('CHECKING User userAuthentication: ')

	if (userTimeout) {
		console.log('AXIOS: ', userTimeout)
	}
	return next(action)
}

const middleware = applyMiddleware(promise(), thunk, logger(), userAuthentication)


export default createStore(reducer, middleware)
//export default createStore(reducer, middleware, window.devToolsExtension && window.devToolsExtension()); //Devtools
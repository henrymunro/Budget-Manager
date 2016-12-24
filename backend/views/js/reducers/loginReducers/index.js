import { combineReducers } from 'redux'

import axios from './axiosReducer'
import login from './loginReducer'

export default combineReducers({
	axios,
    login
})

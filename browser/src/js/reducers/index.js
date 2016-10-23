import { combineReducers } from 'redux'

import user from './userReducer'
import layout from './layoutReducer'

import axios from './axiosReducer'
import fileUpload from './fileUploadReducer'
import mappings from './mappingsReducer'
import accounts from './accountsReducer'
import ledger from './ledgerReducer'
import types from './typeReducer'
import nav from './navReducer'

export default combineReducers({
  user,
  layout,
  fileUpload,
	axios,
	mappings, 
	accounts, 
	ledger,
	types,
	nav
})

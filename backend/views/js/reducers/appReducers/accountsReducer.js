export default function reducer(state={
		accounts: [],
		newAccountText: ''

	}, action){

	switch(action.type) {

		case "GET_ACCOUNTS_FULFILLED": {
        	return {...state, accounts: action.payload.data}
      	}

      	case "UPDATE_ADD_ACCOUNT_TEXT": {
        return {...state, newAccountText: action.payload}
      }
  }

	return state
}
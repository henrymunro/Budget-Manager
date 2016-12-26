export default function reducer(state={
		loggedIn: false,
		shouldRedirect: false,
		errorMessage: null,
    createUserMessage: null
	}, action){

	switch(action.type) {

		case "AUTHENTICATE_USER_FULFILLED": {
			const { loggedIn, shouldRedirect, errorMessage } = action.payload.data
        	return {...state, 
        		loggedIn: loggedIn,
        		shouldRedirect: shouldRedirect,
        		errorMessage: errorMessage 
        	}
      	}

  	case "AUTHENTICATE_USER_REJECTED": {
  		return {...state, 
    		loggedIn: false,
    		shouldRedirect: false,
    		errorMessage: "Error connecting to the server please try again." 
    	}
  	}

    case "CREATE_USER_FULFILLED":{
      return{
        ...state,
        createUserMessage: action.payload.data.message
      }
    }

  }

	return state
}
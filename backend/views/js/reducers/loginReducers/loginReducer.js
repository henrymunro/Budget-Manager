export default function reducer(state={
		loggedIn: false,
		shouldRedirect: false,
		errorMessage: null
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

  }

	return state
}
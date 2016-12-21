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

  }

	return state
}
export default function reducer(state={
		heading: "Welcome",
		fetching: false, 
		fetched: false, 
		error: null,
	}, action){

	switch(action.type) {
		case "UPDATE_HEADING": {
			return {...state, heading: action.payload}
		}
		
	}

	return state
}
export default function reducer(state={
		hash:''
	}, action){

	switch(action.type) {
		case "UPDATE_HASH": {
			return {...state, hash: action.payload}
		}
		
	}

	return state
}
export default function reducer(state={
		hash:'',
		mappingPopoverOpen: false
	}, action){

	switch(action.type) {
		case "UPDATE_HASH": {
			return {...state, hash: action.payload}
		}
		
	}

	switch(action.type) {
		case "NAV_OPEN_MAPPING_POPOVER" : {
			return {...state, mappingPopoverOpen: true}
		}
	}

	switch(action.type) {
		case "NAV_CLOSE_MAPPING_POPOVER" : {
			return {...state, mappingPopoverOpen: false}
		}
	}


	return state
}
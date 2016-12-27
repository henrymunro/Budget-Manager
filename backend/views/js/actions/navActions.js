
export function updateHASH(hash){
	return {
    	type: 'UPDATE_HASH',
 	   payload: hash
  }
}

export function logUserOut(axios){
	return { 
		type: 'LOG_USER_OUT', 
		payload: axios.request.get(axios.URLS.logout)
	}
}

export function openMappingPopOver(){
	return {
		type: 'NAV_OPEN_MAPPING_POPOVER',
		payload: true
	}
}

export function closeMappingPopOver(){
	return {
		type: 'NAV_CLOSE_MAPPING_POPOVER',
		payload: false
	}
}
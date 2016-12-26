
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

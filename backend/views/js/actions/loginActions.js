export function authenticateUser (username, password, axios) {
  return {
    type: 'AUTHENTICATE_USER',
    payload: axios.request.post(axios.URLS.login, {username: username, password:password})
  }
}

export function redirectToHome (axios) {
  return {
    type: 'REDIRECT_HOME',
    payload: axios.request.get(axios.URLS.home)
  }
}


export function createUser (username, firstname, lastname, email, password, axios) {
  return {
    type: 'CREATE_USER',
    payload: axios.request.post(axios.URLS.createUser, {
    	username:username, 
    	firstname: firstname, 
    	lastname: lastname, 
    	email: email, 
    	password: password
    })
  }
}



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
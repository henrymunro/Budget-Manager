import axios from 'axios'

export default function reducer (state = {
    axios: {
      request: axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 5000

      }),
      URLS: {
        baseURL: 'http://localhost:3000/',
        // file Uploads 
        login: 'login',
        home: 'home'
      }
    }
  } , action) {
  return state
}

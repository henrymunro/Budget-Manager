import React from 'react'
import { connect } from 'react-redux'


import { authenticateUser, redirectToHome } from 'js/actions/loginActions'

import baseStyles from 'styles/base.css'


@connect((store) => {
  return {
    axios: store.axios.axios, 
    login: store.login,
  }
})


export default class Login extends React.Component {
  componentWillMount () {

  }

  validateUser(e) {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    this.props.dispatch(authenticateUser(username, password, this.props.axios))

  }




  render () {

    const {shouldRedirect, loggedIn, errorMessage } = this.props.login

    if(shouldRedirect){      
      window.location = "http://localhost:3000/home"
    }

    return (
      <div class="row">
        <div>{errorMessage}</div>
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="Username" id="username" type="text" class="validate" />
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input placeholder="Password" id="password" type="password" class="validate" />
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <a class="waves-effect waves-light btn" onClick={this.validateUser.bind(this)}>Login</a>
            </div>
          </div>
   
        </form>
      </div>
    )
  }
}


Login.propTypes = {

}


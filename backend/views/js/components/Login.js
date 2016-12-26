import React from 'react'
import { connect } from 'react-redux'


import { authenticateUser, redirectToHome, createUser } from 'js/actions/loginActions'

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

  createUser(e){
    const username = document.getElementById('createUsername').value
    const password = document.getElementById('createPassword').value
    const email = document.getElementById('createEmail').value
    const firstName = document.getElementById('createFirstName').value
    const lastName = document.getElementById('createLastName').value
    this.props.dispatch(createUser(username, firstName, lastName, email, password, this.props.axios))

  }



  render () {

    const {shouldRedirect, loggedIn, errorMessage, createUserMessage } = this.props.login

    if(shouldRedirect){      
      window.location = "http://localhost:3000/home"
    }

    return (
      <div>
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
        <div className="row">
          <h4>Create New User</h4>
          <div>{createUserMessage}</div>
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input placeholder="Username" id="createUsername" type="text" class="validate" />
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input placeholder="Password" id="createPassword" type="password" class="validate" />
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input placeholder="Email" id="createEmail" type="text" class="validate" />
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input placeholder="First Name" id="createFirstName" type="text" class="validate" />
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input placeholder="Last Name" id="createLastName" type="text" class="validate" />
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <a class="waves-effect waves-light btn" onClick={this.createUser.bind(this)}>Save</a>
              </div>
            </div>
     
          </form>

        </div>
        
      </div>
    )
  }
}


Login.propTypes = {

}


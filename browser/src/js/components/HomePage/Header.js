import React from 'react'

export default class Header extends React.Component {

  render () {
    return (
      <div>
        <h1>Welcome Back {this.props.userName}!</h1>
      </div>
    )
  }
}

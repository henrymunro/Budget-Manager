import React from 'react'

import {logUserOut} from 'js/actions/navActions'

export default class NavBar extends React.Component {

  logUserOut(){
    this.props.dispatch(logUserOut(this.props.axios))
  }


  render () {
    return (
      <div>
        	<ul className='nav navbar-nav'>
        		<li className='nav-item'><a className='nav-link' href="#ledger">Ledger</a></li>
        		<li className='nav-item'><a className='nav-link' href="#mappings">Mappings - Edit</a></li>            
            <li className='nav-item'><a className='nav-link' href="#addNewMappings">Mappings - Add New</a></li>
        		<li className='nav-item'><a className='nav-link' href="#fileUpload">File Upload</a></li>      		
        		<li className='nav-item'><a className='nav-link' href="#type">Type & Account</a></li>
        	</ul>
          <button onClick={this.logUserOut.bind(this)}>Logout</button>
      </div>
    )
  }
}

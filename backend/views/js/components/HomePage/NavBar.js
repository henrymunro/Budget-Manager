import React from 'react'

var $ = require("styles/materialize-css/js/materialize.js")

import {logUserOut} from 'js/actions/navActions'

export default class NavBar extends React.Component {

  logUserOut(){
    this.props.dispatch(logUserOut(this.props.axios))
  }


  render () {

    const hash = this.props.hash
    console.log('HASH: ', hash)
    return (
        <div class="navbar-fixed">
          <nav>
            <div class="right nav-wrapper">
            	<ul>
                	<li className={hash==='#ledger'?'active':''}>
                        <a className='nav-link' href="#ledger">Ledger</a>
                    </li>
                	<li className={hash==='#mappings'?'active':''}>
                        <a className='nav-link' href="#mappings">Mappings - Edit</a>
                    </li>            
                    <li className={hash==='#addNewMappings'?'active':''}>
                        <a className='nav-link' href="#addNewMappings">Mappings - Add New</a>
                    </li>
                	<li className={hash==='#fileUpload'?'active':''}>
                        <a className='nav-link' href="#fileUpload">File Upload</a></li>      		
                	<li className={hash==='#type'?'active':''}>
                        <a className='nav-link' href="#type">Type & Account</a>
                    </li>
                    <li>
                        <a className="waves-effect waves-light btn" onClick={this.logUserOut.bind(this)}>Logout</a>
                    </li>
            	</ul>          
            </div>
          </nav>
        </div>
    )
  }
}

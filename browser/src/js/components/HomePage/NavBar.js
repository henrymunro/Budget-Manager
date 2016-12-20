import React from 'react'

export default class NavBar extends React.Component {
  render () {
    return (
      <div>
        	<ul className='nav navbar-nav'>
        		<li className='nav-item'><a className='nav-link' href="#ledger">Ledger</a></li>
        		<li className='nav-item'><a className='nav-link' href="#mappings">Mappings - Edit</a></li>            
            <li className='nav-item'><a className='nav-link' href="#addNewMappings">Mappings - Add New</a></li>
        		<li className='nav-item'><a className='nav-link' href="#accounts">Accounts</a></li>
        		<li className='nav-item'><a className='nav-link' href="#fileUpload">File Upload</a></li>      		
        		<li className='nav-item'><a className='nav-link' href="#type">Type</a></li>
        	</ul>
      </div>
    )
  }
}

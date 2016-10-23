import React from 'react'

export default class NavBar extends React.Component {
  render () {
    return (
      <div>
      	<ul>
      		<li><a href="#ledger">Ledger</a></li>
      		<li><a href="#mappings">Mappings</a></li>
      		<li><a href="#accounts">Accounts</a></li>
      		<li><a href="#fileUpload">File Upload</a></li>      		
      		<li><a href="#type">Type</a></li>
      	</ul>
      </div>
    )
  }
}

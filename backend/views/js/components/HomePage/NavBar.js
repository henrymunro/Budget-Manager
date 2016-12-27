import React from 'react'

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';



import {logUserOut,
        openMappingPopOver,
        closeMappingPopOver
    } from 'js/actions/navActions'

export default class NavBar extends React.Component {

  logUserOut(){
    this.props.dispatch(logUserOut(this.props.axios))
  }

  openMappingPopOver(e){
    // This prevents ghost click.
    e.preventDefault()

    this.props.dispatch(openMappingPopOver())
  }

  closeMappingPopOver(){
    this.props.dispatch(closeMappingPopOver())
  }

  updateHash(e){
    console.log(e.target)
    const userMapping_id = e.target.attributes.getNamedItem('data-hash').value
  }


  render () {

    const { hash, mappingPopoverOpen } = this.props.nav
    console.log('HASH: ', hash)

    const mappingButton = <div>
        <FlatButton
          onTouchTap={this.openMappingPopOver.bind(this)}
          label="Mappings"
          id='Nav_Mapping_Button'
        />
        <Popover
          open={mappingPopoverOpen}
          anchorEl={document.getElementById('Nav_Mapping_Button')}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.closeMappingPopOver.bind(this)}
          animation={PopoverAnimationVertical}
        >
            <Menu>
                <MenuItem primaryText="" children={<a href='#addNewMappings'>Add Mapping</a>}/>
                <MenuItem primaryText="" children={<a href='#mappings'>Edit Mappings</a>}/>
            </Menu>
        </Popover>
    </div>


    return (

        <Toolbar>
        <ToolbarGroup>
            <a href="#ledger">
                <ToolbarTitle text="Ledger" />
            </a>
            <a href="#fileUpload">
                <ToolbarTitle text="Upload" />
            </a>
            <a href="#type">
                <ToolbarTitle text="Type & Account" />
            </a>
            {mappingButton}


          <ToolbarSeparator />
          <RaisedButton label="Logout" primary={true} onClick={this.logUserOut.bind(this)}/>
          
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
     
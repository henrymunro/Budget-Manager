import React from 'react'
import { connect } from 'react-redux'

import { fetchUser } from '../actions/userActions'
import { updateHASH } from '../actions/navActions'

import HomePage from './HomePage'
import FileUpload from './FileUpload'
import Mappings from './Mappings'
import Accounts from './Accounts'
import Ledger from './Ledger'
import Type from './Type'
import NavBar from './HomePage/NavBar'
import OverviewGraph from './HomePage/OverviewGraph'

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    hash: store.nav.hash
  }
})
export default class Layout extends React.Component {
  componentWillMount () {
    // this.props.dispatch(fetchUser())
  }

  onHashChange() {
    // Do something appropriate with `window.location.hash`
    this.props.dispatch(updateHASH(window.location.hash))
  }

// Handle browser navigation events

  render () {
  window.addEventListener('hashchange', this.onHashChange.bind(this), false);
  const hash = this.props.hash || "ledger"
  let display  = <Ledger />

  switch(hash) {
    case "#mappings": {
      display = <Mappings />
      break
    }
    case "#accounts": {
      display = <Accounts />
      break
    }
    case "#ledger": {
      display = <Ledger />
      break
    }   
    case "#fileUpload": {
      display = <FileUpload />
      break
    }
    case "#type": {
      display = <Type /> 
      break
    }
  }


    return <div>
              <NavBar />
              <OverviewGraph />
           </div>
  }
}
              // {display}
             // <FileUpload />
             // <Accounts />
             // <Mappings />
              // <Type /> 
            // <HomePage />

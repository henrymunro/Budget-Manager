import React from 'react'
import { connect } from 'react-redux'
import { StickyContainer, Sticky } from 'react-sticky';

import { getAccounts } from 'js/actions/accountsActions'
import { getYearMonth, getLedger, updateDescription, saveDescription } from 'js/actions/ledgerActions'
import { getType } from 'js/actions/typeActions'

import NavBar from 'js/components/HomePage/NavBar'
import Ledger from 'js/components/Ledger' 
import FileUpload from 'js/components//FileUpload'
import Mappings from 'js/components//Mappings'
import Accounts from 'js/components//Accounts'
import Type from 'js/components//Type'


import baseStyles from 'styles/base.css'


@connect((store) => {
  return {
    axios: store.axios.axios, 
    accounts: store.accounts.accounts,
    ledger: store.ledger,
    hash: store.nav.hash,
    types: store.types
  }
})
export default class LowerHome extends React.Component {
  componentWillMount () {

  }

  componentDidUpdate(){

  }


  render () {
    const { ...other } = this.props // also passes dispatch

      // Sets default routing to ledger 
    const hash = this.props.hash || "ledger"
    let display  = <Ledger {...other} />

    // Updates the compnents shown based on route
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
        display = <Ledger {...other} />
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

    return (
      <StickyContainer>
        <div className={'row '} >        
          <div className='col s12 l2'>
            <Sticky>
              <div className="card">
                <NavBar /> 
              </div>
            </Sticky>  
          </div>
          <div className='col s12 l10'> 
            {display}
          </div>
        </div>
      </StickyContainer>
    )
  }
}


LowerHome.propTypes = {

}


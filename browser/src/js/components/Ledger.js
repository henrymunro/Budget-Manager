import React from 'react'
import { connect } from 'react-redux'
import { StickyContainer, Sticky } from 'react-sticky';

import { getAccounts } from 'js/actions/accountsActions'
import { getYearMonth, getLedger, updateDescription, saveDescription } from 'js/actions/ledgerActions'
import { getType } from 'js/actions/typeActions'

import AccountsDropDown from 'js/components/Accounts/AccountsDropDown'
import UploadedFileTable from 'js/components/FileUpload/UploadedFileTable'
import LedgerFilter from 'js/components/Ledger/LedgerFilter'
import LedgerTable from 'js/components/Ledger/LedgerTable'


@connect((store) => {
  return {
    axios: store.axios.axios, 
    accounts: store.accounts.accounts,
    ledger: store.ledger,
    types: store.types
  }
})
export default class Ledger extends React.Component {
  componentWillMount () {
    this.props.dispatch(getYearMonth(this.props.axios))
    this.props.dispatch(getAccounts(this.props.axios))
    this.props.dispatch(getType(this.props.axios))
    this.props.dispatch(getLedger(this.props.axios))
  }


  render () {
    const { ...other } = this.props // also passes dispatch

    return (
      <div className='container'>
          <StickyContainer>
            <div className="card hoverable">
              <Sticky stickyStyle={{width:'100%', background:'white'}}>
                  <LedgerFilter {...other} />
              </Sticky>
              <StickyContainer>
                <LedgerTable {...other} />
              </StickyContainer>
            </div>
          </StickyContainer>
      </div>
    )
  }
}




Ledger.propTypes = {

}


import React from 'react'
import { connect } from 'react-redux'
import { StickyContainer, Sticky } from 'react-sticky';

import { getAccounts } from '../actions/accountsActions'
import { getYearMonth, getLedger, updateYearMonth, updateDescription, saveDescription } from '../actions/ledgerActions'
import { getType } from '../actions/typeActions'

import AccountsDropDown from './Accounts/AccountsDropDown'
import UploadedFileTable from './FileUpload/UploadedFileTable'
import YearMonthDropDown from './Ledger/YearMonthDropDown'
import LedgerTable from './Ledger/LedgerTable'


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
    this.props.dispatch(getLedger(this.props.axios))
    this.props.dispatch(getType(this.props.axios))
  }

  updatedYearMonth(e){
    const yearMonth = e.target.value 
    this.props.dispatch(updateYearMonth(yearMonth))
  }


  render () {
    const { ...other } = this.props // also passes dispatch

    return (
      <div className='container'>
          <h2>Month overview page</h2>
          <StickyContainer>
              <YearMonthDropDown {...other} onYearMonthChange={this.updatedYearMonth.bind(this)} /> 
              <LedgerTable {...other} />
          </StickyContainer>
      </div>
    )
  }
}




Ledger.propTypes = {

}


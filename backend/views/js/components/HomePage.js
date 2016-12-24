import React from 'react'
import { connect } from 'react-redux'

import { fetchUser } from '../actions/userActions'
import { updateHeading } from '../actions/layoutActions'

import Footer from './HomePage/Footer'
import Header from './HomePage/Header'
import { getAccounts } from '../actions/accountsActions'
import { getYearMonth, getLedger } from '../actions/ledgerActions'


import AccountsDropDown from './Accounts/AccountsDropDown'

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    heading: store.layout.heading,    
    axios: store.axios.axios,
    accounts: store.accounts.accounts,
    ledger: store.ledger
  }
})
export default class Layout extends React.Component {
  componentWillMount () {
    this.props.dispatch(fetchUser())
    this.props.dispatch(getAccounts(this.props.axios))
    this.props.dispatch(getYearMonth(this.props.axios))    
    this.props.dispatch(getLedger(this.props.axios))
  }

  updateHeading (e) {
    const title = e.target.value
    this.props.dispatch(updateHeading(title))
  }

  render () {
    const { user, heading } = this.props
    return (
      <div>
        <Header userName={user.name} />
        <h3>{heading}</h3>
        <input value={this.props.title} onChange={this.updateHeading.bind(this)} />
        <Footer />
      </div>
    )
  }
}
// <PhotoGrid />

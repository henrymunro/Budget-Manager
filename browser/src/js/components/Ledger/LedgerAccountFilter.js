import React from 'react'

import { updateAccountFilter } from 'js/actions/ledgerActions'

import baseStyles from 'styles/base.css'

export default class LedgerAccountFilter extends React.Component {
  componentWillMount () {

  }

  updateAccountFilterSelect(e){
  	const filterType = e.target.value
  	this.props.dispatch(updateAccountFilter(filterType))
  }


  render () {
   
    const { accounts } = this.props
    const { accountFilter } = this.props.ledger.filters

    const accountList = accounts.map((item, key)=> {
    	return <option 
                key={key} 
                value={item.AccountName}
                data-account={item.AccountName}
              >
                {item.AccountName}
              </option>
    })

    const accountFilterList = accountList.concat(<option 
                key={'no filter'} 
                value={false}
                data-account={false}
              >
                {'Show all accounts'}
              </option>)


    return <select value={accountFilter} data-id='accountFilter' onChange={this.updateAccountFilterSelect.bind(this)}>
        {accountFilterList}
    </select>
  }
}


LedgerAccountFilter.propTypes = {
  accounts: React.PropTypes.array.isRequired, 
  accountFilter: React.PropTypes.string.isRequired
}

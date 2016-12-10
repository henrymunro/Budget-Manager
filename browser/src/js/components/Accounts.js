import React from 'react'
import { connect } from 'react-redux'

import { getAccounts, addAccounts, updateNewAccountTextBox, saveNewAccount } from '../actions/accountsActions'

import AccountsDropDown from './Accounts/AccountsDropDown'
// import HomePage from './HomePage'


@connect((store) => {
  return {    
    axios: store.axios.axios,
    accounts: store.accounts.accounts,
    addNewAccountText: store.accounts.newAccountText
  }
})
export default class Accounts extends React.Component {
  componentWillMount () {
    this.props.dispatch(getAccounts(this.props.axios))
  }

  updateNewAccountText(e){
    const text = e.target.value
    this.props.dispatch(updateNewAccountTextBox(text))
  }

  saveNewAccount(e){
    console.log('BUTTON CLICKED ')
    const account = this.props.addNewAccountText 
    if ( account!= ''){
      this.props.dispatch(saveNewAccount(account, this.props.axios))
        .then((res)=>{
            this.props.dispatch(getAccounts(this.props.axios))          
            this.props.dispatch(updateNewAccountTextBox(''))
          })
    }
  }

  UpdateDropDown(e){
    console.log('Account: ', e.target.value)
  }

  render () {

    const { accounts } = this.props
    const accountsListElements = accounts.map((account, key)=>{
      return <li data-account-id={account.UserAccount_id} key={key} className="list-group-item">
                {account.AccountName}
                <button className='button button-xs'>x</button>
              </li>
    })
    const accountsList = <ul className="list-group">{accountsListElements}</ul>

    return <div className='card'>
            <h4>Accounts</h4>
            <AccountsDropDown accounts={accounts} selectedAccount='amex' onChange={this.UpdateDropDown} />
              <div className="container">
                {accountsList}
              </div>
             <input placeholder="Add New Account" value={this.props.addNewAccountText} onChange={this.updateNewAccountText.bind(this)} /> 
             <a class="waves-effect waves-light btn" onClick={this.saveNewAccount.bind(this)}>Save Account</a>      
           </div>
  }
}



Accounts.propTypes = {
  accounts: React.PropTypes.array,
  addNewAccountText: React.PropTypes.string
}

import React from 'react'
import { connect } from 'react-redux'

import { getAccounts, addAccounts, updateNewAccountTextBox, saveNewAccount, deleteAccount } from '../actions/accountsActions'

import AccountsDropDown from './Accounts/AccountsDropDown'
// import HomePage from './HomePage'

import baseStyles from 'styles/base.css'



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

  deleteAccount(e){
    const UserAccount_id = e.target.attributes.getNamedItem('data-useraccount-id').value
    console.log('USER: ', UserAccount_id)
    this.props.dispatch(deleteAccount(UserAccount_id, this.props.axios))
        .then((res)=>{
          this.props.dispatch(getAccounts(this.props.axios))
        })
  }

  render () {

    const { accounts } = this.props
    const accountsListElements = accounts.map((account, key)=>{
      return <li data-account-id={account.UserAccount_id} key={key} style={{width:'100%', marginBottom:'5px'}}>
                {account.AccountName}
                <button className={baseStyles.deleteButton}
                  style={{float:'Right'}}>
                  <i className="tiny material-icons"
                     data-useraccount-id={account.UserAccount_id}
                     onClick={this.deleteAccount.bind(this)}
                     >delete</i>
                </button>
              </li>
    })
    const accountsList = <ul className="list-group">{accountsListElements}</ul>

    return <div className='col s12 l3 card'> 
              <div className={baseStyles.cf}>
                <h4>Accounts</h4>
                  <div className="container">
                    {accountsList}
                  </div>
                 <input placeholder="Add New Account" value={this.props.addNewAccountText} onChange={this.updateNewAccountText.bind(this)} /> 
                 <a class="waves-effect waves-light btn" onClick={this.saveNewAccount.bind(this)}>Save Account</a>      
             </div>
          </div>
  }
}



Accounts.propTypes = {
  accounts: React.PropTypes.array,
  addNewAccountText: React.PropTypes.string
}

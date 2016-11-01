import React from 'react'

import {updateSelectedAccountAction } from 'js/actions/fileUploadActions'


export default class AccountsDropDown extends React.Component {
  componentWillMount () {
  }

  updatedSelectedAccount(e){
    const account_id = e.target.value
    const file_id = e.target.attributes.getNamedItem('data-id').value
    console.log(account_id, file_id)
    this.props.dispatch(updateSelectedAccountAction(file_id, account_id))
  }


  render () {

    const { accounts, selected, onAccountChange, id } = this.props
    const accountSelectList = accounts.map((account, key)=>{
      let selected = false
      return <option 
                data-account-id={account.UserAccount_id} 
                key={key} 
                value={account.UserAccount_id}
              >
                {account.AccountName}
              </option>
    })

    return <select defaultValue={selected} data-id={id} onChange={this.updatedSelectedAccount.bind(this)}>
        {accountSelectList}
    </select>
  }
}

AccountsDropDown.propTypes = {
  accounts: React.PropTypes.array,
  selected: React.PropTypes.string,
  id: React.PropTypes.number

}


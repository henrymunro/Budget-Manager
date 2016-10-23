import React from 'react'


export default class AccountsDropDown extends React.Component {
  componentWillMount () {
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

    return <select defaultValue={selected} data-id={id} onChange={onAccountChange}>
        {accountSelectList}
    </select>
  }
}

AccountsDropDown.propTypes = {
  accounts: React.PropTypes.array,
  selected: React.PropTypes.string,
  onAccountChange: React.PropTypes.function,
  id: React.PropTypes.number

}


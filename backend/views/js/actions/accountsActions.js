export function getAccounts (axios) {
  return {
    type: 'GET_ACCOUNTS',
    payload: axios.request.get(axios.URLS.accounts)
  }
}

export function addAccount (axios) {
  return {
    type: 'GET_ACCOUNTS',
    payload: axios.request.get(axios.URLS.accounts)
  }
}


export function updateNewAccountTextBox(text){
	return{
		type: 'UPDATE_ADD_ACCOUNT_TEXT',
		payload: text
	}
}

export function saveNewAccount(accountName, axios){
	return{ 
		type: 'SAVE_NEW_ACCOUNT',
		payload: axios.request.post(axios.URLS.addAccount, {accountName:accountName})
	}
}

export function deleteAccount(userAccount_id, axios){
	return{ 
		type: 'DELETE_ACCOUNT',
		payload: axios.request.post(axios.URLS.deleteAccount, {userAccount_id:userAccount_id})
	}

}

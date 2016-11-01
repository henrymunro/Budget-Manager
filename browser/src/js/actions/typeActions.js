
// Gets the users types from the database
export function getType(axios) {
  return {
    type: 'GET_TYPE',
    payload: axios.request.get(axios.URLS.type)
  }
}

// Actions to add a new type 
export function updateNewTypeTextBox(text){
    return {
    type: 'UPDATE_ADD_TYPE_TEXT',
    payload: text
  }
}

//Saves new type to the database
export function saveNewType(type, axios) { 
  return {
    type: 'SAVE_NEW_TYPE',
    payload: axios.request.post(axios.URLS.addType, {budgetType: type})
  }

}

//Actions to add a new subtype
export function updateNewSubTypeTextBox(text) {
  return {
    type: 'UPDATE_ADD_SUB_TYPE_TEXT',
    payload: text
  }
}
  
// Saves new sub type to the database
export function saveNewSubType(subType, type, axios) {
  return {
    type: 'SAVE_NEW_SUB_TYPE',
    payload: axios.request.post(axios.URLS.addSubType, {budgetType: type, budgetSubType:subType})
  }
}

// Ceases a type and all child subtypes in the database 
export function ceaseType(type, axios){
  return {
    type: 'CEASE_TYPE', 
    payload: axios.request.post(axios.URLS.ceaseType, {budgetType: type})
  }
}
// Ceases a sub type in the database
export function ceaseSubType(subType, axios){
  return {
    type: 'CEASE_SUB_TYPE', 
    payload: axios.request.post(axios.URLS.ceaseSubType, {budgetSubType: subType})
  }
}

// Updates the selected type browser side for the add new type section
export function updateSelectedTypeForAddNewType(type, type_id){
  return {
    type: 'UPDATE_SELECTED_TYPE_IN_ADD_NEW_SECTION',
    payload: type
  }
}



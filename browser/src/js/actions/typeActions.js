
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

// Updates the selected type browser side for the add new type section
export function updateSelectedTypeForAddNewType(type, type_id){
  return {
    type: 'UPDATE_SELECTED_TYPE_IN_ADD_NEW_SECTION',
    payload: type
  }
}



// Updates the hovered value in the in the store to reveal subtypes in the open drop down
export function updateHoveredTypeInDropDown(type){
  return {
    type: 'UPDATE_HOVERED_TYPE_IN_DROP_DOWN',
    payload: type
  }
}




//// ############### drop down type test 

export function updatedSelectedType(type, subType){
  return{
    type: "UPDATE_SELECTED_TYPE",
    payload: { 
      typeSelected: type, 
      subTypeSelected: subType
    }
  }
}

export function isDropDownVisible(state){
  return{
    type: "SHOW_DROP_DOWN",
    payload: state
  }
}
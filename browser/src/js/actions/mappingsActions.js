
// Gets Mapping from the database
export function getMappings (axios) {
  return {
    type: 'GET_MAPPINGS',
    payload: axios.request.get(axios.URLS.mappings)
  }
}

// Saves a new mapping to the database 
export function saveNewMapping ( mapping, mapTo, axios) {
  return {
    type: 'SAVE_NEW_MAPPING',
    payload: axios.request.post(axios.URLS.addMapping, {mapping: mapping, mapTo:mapTo })
  }
}

// Deletes a mapping from the database 
export function deleteUserMapping (userMapping_id, axios){
  return {
    type: 'DELETE_USER_MAPPING',
    payload: axios.request.post(axios.URLS.deleteMapping, {userMapping_id: userMapping_id})
  }
}

// Updates the new mapping text box in the browser
export function updateNewMappingTextBox(text){
    return {
    type: 'UPDATE_ADD_MAPPING_TEXT',
    payload: text
  }
}

// Updates the new map to text box in the browser 
export function updateNewMapToTextBox(text){
    return {
    type: 'UPDATE_ADD_MAPTO_TEXT',
    payload: text
  }
}



// Expands one type drop down when a type element is clicked
export function updateMappingIDToExpandTypeDropDown(User_Mapping_id){
  return {
    type: 'UPDATE_TYPE_DROP_DOWN_MAPPING_ID',
    payload: User_Mapping_id
  }
}

// Updates the hovered value in the in the store to reveal subtypes in the open drop down
export function updateHoveredTypeInDropDown(type){
  return {
    type: 'UPDATE_HOVERED_TYPE_IN_DROP_DOWN_MAPPING',
    payload: type
  }
}

//Updates the type of an existing mapping in the DB
export function saveNewSelectedType(type, subType, UserMapping_id, axios){
  return {
    type: 'SAVE_TYPE_MAPPING',
    payload: axios.request.post(axios.URLS.updateMappingType, { budgetType: type, budgetSubType:subType, userMapping_id: UserMapping_id})
  }
}
// Updates the type/subtype when a user clicks the drop down
export function updatedSelectedType(type, subType, UserMapping_id){
  return{
    type: "UPDATE_SELECTED_TYPE_MAPPING",
    payload: { 
      typeSelected: type, 
      subTypeSelected: subType,
      userMapping_id: UserMapping_id
    }
  }
}



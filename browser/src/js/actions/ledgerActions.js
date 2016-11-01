
export function getYearMonth(axios) {
  return {
    type: 'GET_YEAR_MONTH',
    payload: axios.request.get(axios.URLS.yearMonth)
  }
}


export function getLedger(axios) {
  return {
    type: 'GET_LEDGER',
    payload: axios.request.get(axios.URLS.ledger)
  }
}


export function updateYearMonth(yearMonth) {
  return { 
    type: 'UPDATE_YEAR_MONTH',
    payload: yearMonth
  }
}

// Updates the store on descripion updates 
export function updateDescription(ledger_id, description) {
  return {
    type: 'UPDATE_DESCRIPTION',
    payload: { description: description, ledger_id:ledger_id}
  }
}

// save description updates to the DB 
export function saveDescription(ledger_id, description, axios) {
  return {
    type: 'SAVE_DESCRIPTION',
    payload: axios.request.post(axios.URLS.saveDescription, { description: description, ledger_id:ledger_id})
  }
}


export function updateLegerIDToExpandTypeDropDown(UserBudget_id){
  return {
    type: 'UPDATE_TYPE_DROP_DOWN_LEDGER_ID',
    payload: UserBudget_id
  }
}

// Updates the hovered value in the in the store to reveal subtypes in the open drop down
export function updateHoveredTypeInDropDown(type){
  return {
    type: 'UPDATE_HOVERED_TYPE_IN_DROP_DOWN',
    payload: type
  }
}

//Saves new type to the DB 
export function saveNewSelectedType(type, subType, User_Ledger_id, axios){
  return {
    type: 'SAVE_TYPE',
    payload: axios.request.post(axios.URLS.updateLedgerType, { budgetType: type, budgetSubType:subType, user_Ledger_id: User_Ledger_id})
  }
}
// Updates the type/subtype when a user clicks the drop down
export function updatedSelectedType(type, subType, User_Ledger_id){
  return{
    type: "UPDATE_SELECTED_TYPE",
    payload: { 
      typeSelected: type, 
      subTypeSelected: subType,
      User_Ledger_id: User_Ledger_id
    }
  }
}

// Updates the split value in the store 
export function updateSplitValue(User_Ledger_id, Split){
  return{
    type:"UPDATE_SPLIT_VALUE",
    payload:{
      User_Ledger_id: User_Ledger_id,
      Split: Split
    }
  }
}

//Saves the new split value to the DB 
export function saveSplitValue(User_Ledger_id, Split, axios){
  return{
    type:"SAVE_SPLIT_VALUE",
    payload:axios.request.post(axios.URLS.updateLedgerSplit, { split: Split, user_Ledger_id: User_Ledger_id})
  }
}



//************* Filters *************/

export function updateTypeFilter(typeFilter){
  return {
    type: "UPDATE_LEDGER_TYPE_FILTER",
    payload: typeFilter
  }
}
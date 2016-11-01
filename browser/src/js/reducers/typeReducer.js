export default function reducer(state={
    types:[],
    distinctTypes: [],
    addNew: {
      selectedType: '',
      addNewTypeText: '',
      addNewSubTypeText: ''
    },
    
  }, action) {

    switch (action.type) {
      case "GET_TYPE_FULFILLED": {
        // Grabs the distinct types
        const distinctTypes = [...new Set(action.payload.data.map(item => item.BudgetType))]
        return {...state, 
          types: action.payload.data,
          distinctTypes: distinctTypes
        }
      }

      case "UPDATE_ADD_TYPE_TEXT": {
        return {
          ...state, 
          addNew:{ 
            selectedType: state.addNew.selectedType,
            addNewTypeText: action.payload,
            addNewSubTypeText: state.addNew.addNewSubTypeText
          }
        }
      }

      case "UPDATE_ADD_SUB_TYPE_TEXT": {
        return {
          ...state, 
          addNew:{ 
            selectedType: state.addNew.selectedType,
            addNewTypeText: state.addNew.addNewTypeText,
            addNewSubTypeText: action.payload 
          }
        }
      }

      case "SAVE_NEW_TYPE_FULFILLED":{
        return {
          ...state, 
          addNew:{ 
            selectedType: state.addNew.selectedType,
            addNewTypeText: '',
            addNewSubTypeText: state.addNew.addNewSubTypeText 
          }
        }
      }

      case "SAVE_NEW_SUB_TYPE_FULFILLED":{
        return {
          ...state, 
          addNew:{ 
            selectedType: state.addNew.selectedType,
            addNewTypeText: state.addNew.addNewTypeText,
            addNewSubTypeText: ''
          }
        }
      }

      case "UPDATE_SELECTED_TYPE_IN_ADD_NEW_SECTION":{
        return {
          ...state, 
          addNew:{ 
            selectedType: action.payload,
            addNewTypeText: state.addNew.addNewTypeText,
            addNewSubTypeText: ''
          }
        }
      }


    }

    return state
}
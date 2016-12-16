export default function reducer(state={
    types:[],
    distinctTypes: [],
    addNew: {
      selectedType: '',
      addNewTypeText: '',
      addNewSubTypeText: ''
    },
    addNewMapping:{
      selectedType: 'other',
      selectedSubType: 'other',
      isDropDownVisible: false,
      hoverType: ''
    }
    
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

      case "UPDATE_ADD_NEW_MAPPING_TYPE":{
        return {
          ...state, 
          addNewMapping:{ 
            selectedType: action.payload.selectedType,
            selectedSubType: action.payload.selectedSubType,
            isDropDownVisible: false,
            hoverType: ''
          }
        }
      }

      case "EXPAND_NEW_MAPPING_TYPE_DROP_DOWN":{
        return {
          ...state,
          addNewMapping:{ 
            selectedType: state.addNewMapping.selectedType,
            selectedSubType: state.addNewMapping.selectedSubType,
            isDropDownVisible: true,
            hoverType: ''
          }
        }
      }

      case "COLLAPSE_NEW_MAPPING_TYPE_DROP_DOWN":{
        return {
          ...state,
          addNewMapping:{ 
            selectedType: state.addNewMapping.selectedType,
            selectedSubType: state.addNewMapping.selectedSubType,
            isDropDownVisible: false,
            hoverType: ''
          }
        }
      }

      case "UPDATE_NEW_MAPPING_HOVER_TYPE":{
        return {
          ...state,
          addNewMapping:{ 
            selectedType: state.addNewMapping.selectedType,
            selectedSubType: state.addNewMapping.selectedSubType,
            isDropDownVisible: true,
            hoverType: action.payload
          }
        }
      }


    }

    return state
}
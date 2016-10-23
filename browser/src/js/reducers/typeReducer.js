export default function reducer(state={
    types:[],
    typeHovered: '',
    addNew: {
      selectedType: '',
      addNewTypeText: '',
      addNewSubTypeText: ''
    },
    //type drop down test 
    typeSelected:'Food',
    subTypeSelected: 'Lunch',
    showDropDown: false
    
  }, action) {

    switch (action.type) {
      case "GET_TYPE_FULFILLED": {
        return {...state, types: action.payload.data }
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


      case "UPDATE_HOVERED_TYPE_IN_DROP_DOWN":{
        return {
          ...state, 
          typeHovered: action.payload
        }
      }


      //Type dropdown tests
      case "UPDATE_SELECTED_TYPE":{
        return{
          ...state,
          showDropDown: false,
          typeSelected: action.payload.typeSelected,
          subTypeSelected: action.payload.subTypeSelected
        }
      }

      case "SHOW_DROP_DOWN":{
        return{
          ...state,
          showDropDown:action.payload
        }
      }


    }

    return state
}
export default function reducer(state={
    mappings:[],
    addNewMappingText: '',
    addNewMapToText: '',
    applyMappingsToAllEntries: false,
    typeDropDown:{
      hoverType:'',
      userMappingsDropDownShow:-1
    }
  }, action) {

    switch (action.type) {
      case "GET_MAPPINGS_FULFILLED": {
        return {...state, mappings: action.payload.data }
      }

      case "UPDATE_ADD_MAPPING_TEXT": {
        return {...state, addNewMappingText: action.payload}
      }

      case "UPDATE_ADD_MAPTO_TEXT": {
        return {...state, addNewMapToText: action.payload}
      }

      case "SAVE_NEW_MAPPING_FULFILLED":{
        return {...state, addNewMapToText:'', addNewMappingText:''}
      }
    


      // Actions to update the type drop down
      case "UPDATE_TYPE_DROP_DOWN_MAPPING_ID":{
        return{
          ...state,
          typeDropDown:{
            hoverType: state.typeDropDown.hoverType,
            userMappingsDropDownShow: action.payload
          }
        }
      }
      case "UPDATE_HOVERED_TYPE_IN_DROP_DOWN_MAPPING":{
        return{
          ...state,
          typeDropDown:{
            hoverType: action.payload,
            userMappingsDropDownShow: state.typeDropDown.userMappingsDropDownShow
          }
        }
      }
      //Updates the selected type/subtype then colapses the dropdown and resets the hovered type
      case "UPDATE_SELECTED_TYPE_MAPPING":{
        const { typeSelected, subTypeSelected, userMapping_id }  = action.payload
        const index = _.findIndex(state.mappings, function (obj) {return Number(obj.UserMapping_id) == Number(userMapping_id) })
        const updatedMappingItem = Object.assign({}, state.mappings[index], {BudgetType: typeSelected, BudgetSubType: subTypeSelected})
        console.log(userMapping_id, 'Index: ', index, ' Updated: ', updatedMappingItem)
        return{
          ...state,
          typeDropDown:{
            hoverType: '',
            userMappingsDropDownShow: -1
          },
          mappings:[
            ...state.mappings.slice(0, index),
            updatedMappingItem,
            ...state.mappings.slice(index + 1)

          ]

        }
      }

      //TOGGLE_APPLY_MAPPINGS_TO_ALL_ENTRIES_SWITCH
      case "TOGGLE_APPLY_MAPPINGS_TO_ALL_ENTRIES_SWITCH":{
        const newValue = action.payload
        return {...state, applyMappingsToAllEntries:newValue}
      }
  }

    return state
}
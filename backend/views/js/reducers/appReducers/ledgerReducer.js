export default function reducer (state = {
  ledgerItems: [{}],
    yearMonth:{
        array:[],
        selectedValue:''
    },
    typeDropDown:{
      hoverType:'',
      userLedgerDropDownShow:-1
    }, 
    filters:{
      typeFilter: 'false',
      accountFilter: 'false',
      updatedFilter: 'false'
    }
  } , action) {
  switch (action.type) {

    case 'GET_LEDGER_FULFILLED': {
      const ledgerItemsRecieved = action.payload.data
      return {...state, ledgerItems: ledgerItemsRecieved}
    }


    case 'GET_YEAR_MONTH_FULFILLED': {
      const yearMonthRecieved = action.payload.data
      return {...state, yearMonth: yearMonthRecieved}
    }

    case "UPDATE_YEAR_MONTH":{
      return {...state, yearMonth: {
              array: state.yearMonth.array,
              selectedValue: action.payload
        }
      }
    }

    case "UPDATE_DESCRIPTION":{
      const { description, ledger_id }  = action.payload
      const index = _.findIndex(state.ledgerItems, function (obj) {return Number(obj.User_Ledger_id) == Number(ledger_id) })
      const updatedLedgerItem = Object.assign({}, state.ledgerItems[index], {Description: description, Updated: 1})
      return{
        ...state,
        ledgerItems:[
          ...state.ledgerItems.slice(0, index),
          updatedLedgerItem,
          ...state.ledgerItems.slice(index + 1)

        ]

      }
    }

    case "UPDATE_TYPE_DROP_DOWN_LEDGER_ID":{
      return{
        ...state,
        typeDropDown:{
          hoverType: state.typeDropDown.hoverType,
          userLedgerDropDownShow: action.payload
        }
      }
    }
    case "UPDATE_HOVERED_TYPE_IN_DROP_DOWN":{
      return{
        ...state,
        typeDropDown:{
          hoverType: action.payload,
          userLedgerDropDownShow: state.typeDropDown.userLedgerDropDownShow
        }
      }
    }
    //Updates the selected type/subtype then colapses the dropdown and resets the hovered type
    case "UPDATE_SELECTED_TYPE":{
      const { typeSelected, subTypeSelected, User_Ledger_id }  = action.payload
      const index = _.findIndex(state.ledgerItems, function (obj) {return Number(obj.User_Ledger_id) == Number(User_Ledger_id) })
      const updatedLedgerItem = Object.assign({}, state.ledgerItems[index], {BudgetType: typeSelected, BudgetSubType: subTypeSelected, Updated: 1})
      return{
        ...state,
        typeDropDown:{
          hoverType: '',
          userLedgerDropDownShow: -1
        },
        ledgerItems:[
          ...state.ledgerItems.slice(0, index),
          updatedLedgerItem,
          ...state.ledgerItems.slice(index + 1)

        ]

      }
    }

    case "UPDATE_SPLIT_VALUE":{
      const { Split, User_Ledger_id }  = action.payload
      const index = _.findIndex(state.ledgerItems, function (obj) {return Number(obj.User_Ledger_id) == Number(User_Ledger_id) })
      const updatedLedgerItem = Object.assign({}, state.ledgerItems[index], {Split: Split, Updated: 1})
      return{
        ...state,
        ledgerItems:[
          ...state.ledgerItems.slice(0, index),
          updatedLedgerItem,
          ...state.ledgerItems.slice(index + 1)

        ]
      }
    }

    case "UPDATE_LEDGER_TYPE_FILTER":{
      const filters = Object.assign({}, state.filters, {typeFilter: action.payload })
      return{
        ...state,
        filters:filters
      }
    }

    case "UPDATE_LEDGER_ACCOUNT_FILTER":{
      const filters = Object.assign({}, state.filters, {accountFilter: action.payload })
      return{
        ...state,
        filters:filters
      }
    }

    case "UPDATE_LEDGER_UPDATED_FILTER":{
      const filters = Object.assign({}, state.filters, {updatedFilter: action.payload })
      return{
        ...state,
        filters:filters
      }
    }

    case "RESET_ALL_FILTERS":{
      return{
        ...state,
        filters:{
          typeFilter: 'false',
          accountFilter: 'false',
          updatedFilter: 'false'
        }
      }
    }



  }

  return state
}



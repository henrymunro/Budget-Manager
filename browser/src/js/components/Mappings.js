import React from 'react'
import { connect } from 'react-redux'

import { 
  getMappings, 
  updateNewMappingTextBox, 
  updateNewMapToTextBox, 
  saveNewMapping, 
  deleteUserMapping
}  from '../actions/mappingsActions'

import { getAccounts } from '../actions/accountsActions'
import { getType } from '../actions/typeActions'


import MappingTypeDropDown from './Type/MappingTypeDropDown'



@connect((store) => {
  return {
    axios: store.axios.axios,
    mappings: store.mappings,
    types: store.types,
    accounts: store.accounts.accounts
  }
})
export default class Mappings extends React.Component {
  componentWillMount () {
    this.props.dispatch(getMappings(this.props.axios))    
    this.props.dispatch(getType(this.props.axios))
  }
  updateNewMappingText(e){
    const text = e.target.value
    this.props.dispatch(updateNewMappingTextBox(text))
  }
  updateNewMapToText(e){
       const text = e.target.value
    this.props.dispatch(updateNewMapToTextBox(text))
  }
  saveNewMapping(e){
    console.log('BUTTON CLICKED ')
    const { addNewMappingText, addNewMapToText } = this.props.mappings
    console.log(addNewMappingText, addNewMapToText)
    this.props.dispatch(saveNewMapping(addNewMappingText, addNewMapToText, this.props.axios))
      .then((res)=>{
          this.props.dispatch(getMappings(this.props.axios))
        })
  }
  deleteUserMapping(e){
    console.log('Delete button pushed')
    const userMapping_id = e.target.attributes.getNamedItem('data-usermapping-id').value
    this.props.dispatch(deleteUserMapping(userMapping_id, this.props.axios))
     .then((res)=>{
          this.props.dispatch(getMappings(this.props.axios))
        })
  }

  render () {
    const { addNewMappingText, addNewMapToText, typeDropDown } = this.props.mappings
    const { mappings, axios } = this.props
    const { types } = this.props.types

    const { hoverType, userMappingsDropDownShow } = typeDropDown


    const mappingTableRows = mappings.mappings.map((row, key)=> {
      const { Mapping, MapTo, UserMapping_id, BudgetType, BudgetSubType}  = row 

       //Logic to work out if drop down should be showing
        const expandTypeDropDown = (Number(userMappingsDropDownShow) === Number(UserMapping_id))
        // Ensures that the changing hover type is only passed to the Drop down that is expanded (to prevent every hidden drop down rendering)
        const hoverTypeForExpandedDropDown = expandTypeDropDown ? hoverType : ''
        //Props to pass to the type drop down
        const {...typesProps } = {UserMapping_id, hoverTypeForExpandedDropDown, BudgetType, BudgetSubType, types, expandTypeDropDown, axios}

      return <tr key={key}>
          <td>{Mapping}</td>
          <td>{MapTo}</td>
          <td><MappingTypeDropDown {...typesProps } dispatch={this.props.dispatch} /></td>
          <td><button data-usermapping-id={UserMapping_id} onClick={this.deleteUserMapping.bind(this)} > DEL </button></td>
      </tr>
    })

    
    return (
      <div className='container'>
        <h3> Mappings </h3>

        <table className='table table-striped'>
          <tbody>
            <tr>
              <th>Mapping</th>
              <th>Map To</th>
              <th>Type</th>
            </tr>
            { mappingTableRows }
          </tbody>
        </table>

        <input value={addNewMappingText} onChange={this.updateNewMappingText.bind(this)} />        
        <input value={addNewMapToText} onChange={this.updateNewMapToText.bind(this)} />
        <button onClick={this.saveNewMapping.bind(this)}>Save Mapping</button> 
      </div>

    )
  }
}


Mappings.propTypes = {
  mappings: React.PropTypes.array, 
  addNewMappingText: React.PropTypes.string,
  addNewMapToText: React.PropTypes.string
}


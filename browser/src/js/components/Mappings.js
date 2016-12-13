import React from 'react'
import { connect } from 'react-redux'

import { 
  getMappings, 
  updateNewMappingTextBox, 
  updateNewMapToTextBox, 
  saveNewMapping, 
  deleteUserMapping,
  applyMappings,
  toggleApplyMappingToAllEntiresSwitch
}  from '../actions/mappingsActions'

import { getAccounts } from '../actions/accountsActions'
import { getType } from '../actions/typeActions'
import { getGraphGroupedByType } from 'js/actions/graphActions'



import MappingTypeDropDown from './Type/MappingTypeDropDown'


import styles from 'styles/components/Mappings.css'
import baseStyles from 'styles/base.css'



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
    if ( addNewMappingText!='' && addNewMapToText!='' ) {
      this.props.dispatch(saveNewMapping(addNewMappingText, addNewMapToText, this.props.axios))
        .then((res)=>{
            this.props.dispatch(getMappings(this.props.axios))
          })
    }
  }
  toggleApplyMappingToAllEntiresSwitch(e){
    const currentValue = this.props.mappings.applyMappingsToAllEntries 
    this.props.dispatch(toggleApplyMappingToAllEntiresSwitch(currentValue))

  }
  applyMappings(e){
    const applyMappingsToAllEntries = this.props.mappings.applyMappingsToAllEntries 
    const applyMappingsToOnlyNewEntries = applyMappingsToAllEntries ? 0 : 1
    console.log('onlyApplyToNewEntries: ', applyMappingsToOnlyNewEntries)
    this.props.dispatch(applyMappings(applyMappingsToOnlyNewEntries, this.props.axios))
        .then((res)=>{
          this.props.dispatch(getGraphGroupedByType(this.props.axios))
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
      const { Mapping, MapTo, UserMapping_id, BudgetType, BudgetSubType, MappingCount}  = row 

       //Logic to work out if drop down should be showing
        const expandTypeDropDown = (Number(userMappingsDropDownShow) === Number(UserMapping_id))
        // Ensures that the changing hover type is only passed to the Drop down that is expanded (to prevent every hidden drop down rendering)
        const hoverTypeForExpandedDropDown = expandTypeDropDown ? hoverType : ''
        //Props to pass to the type drop down
        const {...typesProps } = {UserMapping_id, hoverTypeForExpandedDropDown, BudgetType, BudgetSubType, types, expandTypeDropDown, axios}

      return <tr key={key}>
          <td className={baseStyles.tableRow + ' ' + styles.mappingCol} >{Mapping}</td>
          <td className={baseStyles.tableRow + ' ' + styles.mapToCol} >{MapTo}</td>
          <td className={baseStyles.tableRow + ' ' + styles.typeCol} >
            <MappingTypeDropDown {...typesProps } dispatch={this.props.dispatch} />
          </td>
          <td className={baseStyles.tableRow + ' ' + styles.mappingCountCol} >{MappingCount}</td>
          <td className={baseStyles.tableRow + ' ' + styles.deleteCol}>
            <button className={baseStyles.deleteButton}>
            <i className="tiny material-icons"
               data-usermapping-id={UserMapping_id}
               onClick={this.deleteUserMapping.bind(this)}>delete</i>
            </button>
          </td>
      </tr>
    })

    
    return (
      <div>
        <div className='col s12 l9'> 
          <div className="card"> 
            <table className={'striped ' + baseStyles.tableHead} >
              <tbody className={baseStyles.tableHead}>
                <tr className={baseStyles.tableHead}>
                  <th className={baseStyles.white + ' ' + styles.mappingCol}>Mapping</th>
                  <th className={baseStyles.white + ' ' + styles.mapToCol}>Map To</th>
                  <th className={baseStyles.white + ' ' + styles.typeCol}>Type</th>
                  <th className={baseStyles.white + ' ' + styles.mappingCountCol}>Hit Count</th>
                  <th className={baseStyles.white + ' ' + styles.deleteCol}></th>
                </tr>
              </tbody>
            </table>
            <div style={{height: '450px', overflowY: 'auto', overflowX: 'hidden', position:'relative'}}>
              <table className='striped'>
                <tbody>
                  { mappingTableRows }
                </tbody>
              </table>
            </div>

          </div>
        </div>
        <div className='col s12 l3'>
          <div className="card">
            <div className={styles.addNewMappingBox}>
              <p>Allow overwrite: </p> 
              <div class="switch"
                    onChange={this.toggleApplyMappingToAllEntiresSwitch.bind(this)}>
                <label>
                  Off
                  <input type="checkbox" checked={this.props.mappings.applyMappingsToAllEntries}/>
                  <span class="lever"></span>
                  On
                </label>
              </div>
              <p/>
              <a class="waves-effect waves-light btn" onClick={this.applyMappings.bind(this)}>Apply Mapping</a>
            </div>
          </div>
          <div className="card">
            <div className={styles.addNewMappingBox}>
              <p>Add new mapping: </p> 
              <input placeholder="Mapping" value={addNewMappingText} onChange={this.updateNewMappingText.bind(this)}/>     
              <input placeholder="Map To" value={addNewMapToText} onChange={this.updateNewMapToText.bind(this)} />
              <a class="waves-effect waves-light btn" onClick={this.saveNewMapping.bind(this)}>Save Mapping</a>
            </div>
          </div>
        </div>
      </div>

    )
  }
}


Mappings.propTypes = {
  mappings: React.PropTypes.array, 
  addNewMappingText: React.PropTypes.string,
  addNewMapToText: React.PropTypes.string
}


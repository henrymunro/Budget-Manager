import React from 'react'
import { connect } from 'react-redux'

import cx from 'classnames'
import styles from 'styles/components/Type.css'
import baseStyles from 'styles/base.css'


import {
  getType,
  addNewType,
  updateNewTypeTextBox,
  updateNewSubTypeTextBox,
  saveNewType,
  saveNewSubType,
  updateSelectedTypeForAddNewType,
  ceaseType,
  ceaseSubType
} from '../actions/typeActions'

import TypeDropDown from './Type/TypeDropDown'



@connect((store) => {
  return {
    axios: store.axios.axios,
    types: store.types
  }
}) 
export default class Type extends React.Component {
  componentWillMount () {
    // Gets types on page load
    this.props.dispatch(getType(this.props.axios))
        .then((res)=>{
          // Sets default selected types
          this.props.dispatch(updateSelectedTypeForAddNewType(this.props.types.types[0].BudgetType))
        })    
  }

  // Updates the add new Type text box & store
  updateNewTypeText(e){
    const text = e.target.value
    this.props.dispatch(updateNewTypeTextBox(text))
  }

  // Updates the add new SubType text box & store
  updateNewSubTypeText(e){
    const text = e.target.value
    this.props.dispatch(updateNewSubTypeTextBox(text))
  }

  // Sets the selected type when a user clicks on of the Type list elements in the add new type 
  selectTypeToEdit(e){
    const selectedType = e.target.attributes.getNamedItem('data-list-value').value
    this.props.dispatch(updateSelectedTypeForAddNewType(selectedType))
  }

  //Saves new type to the database
  saveNewType(e){
    const { addNewTypeText } = this.props.types.addNew
    this.props.dispatch(saveNewType(addNewTypeText, this.props.axios))
      .then((res)=>{
          this.props.dispatch(getType(this.props.axios))
        })
  }

  // Saves new sub Type to the database
  saveNewSubType(e){
    const { selectedType, addNewSubTypeText } = this.props.types.addNew
    this.props.dispatch(saveNewSubType(addNewSubTypeText, selectedType, this.props.axios))
      .then((res)=>{
          this.props.dispatch(getType(this.props.axios))
        })
  }

  ceaseType(e){
    const type = e.target.attributes.getNamedItem('data-type').value
    this.props.dispatch(ceaseType(type, this.props.axios))
        .then((res)=>{
          this.props.dispatch(getType(this.props.axios))
        })
  }

  ceaseSubType(e){
    const subType = e.target.attributes.getNamedItem('data-sub-type').value
    this.props.dispatch(ceaseSubType(subType, this.props.axios))
        .then((res)=>{
          this.props.dispatch(getType(this.props.axios))
        })
  }

  render () {
    const { types, typeHovered, showDropDown, typeSelected, subTypeSelected } = this.props.types
    const { addNewTypeText, addNewSubTypeText, selectedType } = this.props.types.addNew

    // Grabs the distinct types
    const distinctTypes = [...new Set(types.map(item => item.BudgetType))]

    // Chucks the distinct types into a list
    const typeList = distinctTypes.map((row, key)=> {
      if (key===0 && selectedType ===''){

      }
      const className = cx({
        // [styles.typeListElm_select]: row === selectedType,
        [styles.typeListElm]: true,
        [baseStyles.cf]: true
      })
      return <li 
              key={key}               
              className={className}>
                <div
                className={styles.typeText}
                data-list-value={row} 
                onClick={this.selectTypeToEdit.bind(this)} >
                  {row}
                </div>
                <button 
                  className={'btn btn-xs ' + styles.typeButton}
                  data-type={row}
                  onClick={this.ceaseType.bind(this)}>
                    x
                </button>
              </li>

    })

    // Grabs the subType items for the current select Type
    const filteredSubType = types.filter((item)=>{
      if (item.BudgetType === selectedType){
        return item
      }
    })

    //Chucks the filtered subTypes into a list
    const subTypeList = filteredSubType.map((row, key)=>{
      return <li key={key} className={styles.typeListElm}>
                <div className={baseStyles.cf}>
                  <div className={styles.type}>
                    {row.BudgetSubType}
                  </div>
                  <button 
                    className={'btn btn-xs ' + styles.typeButton}  
                    data-sub-type={row.BudgetSubType}
                    onClick={this.ceaseSubType.bind(this)}>
                      x
                  </button>
                </div>
              </li>
    })

   
    return (
      <div className='container'>
        <br />
        <br /> 
        <div className="panel panel-default">
          <div className="panel panel-head panel-default">
            <h3> Types </h3>
          </div>
          <div className="panel panel-body">
                         <div className={styles.typeList}>
                <ul>
                  {typeList}
                </ul> 
                <input value={addNewTypeText} onChange={this.updateNewTypeText.bind(this)} />   
                <button onClick={this.saveNewType.bind(this)}>Save Type</button> 
              </div>
              <div className={styles.subTypeList}>
                <ul>
                  {subTypeList}
                </ul> 
                <input value={addNewSubTypeText} onChange={this.updateNewSubTypeText.bind(this)} /> 
                <button onClick={this.saveNewSubType.bind(this)}>Save SubType</button>
               </div>
            </div>
        </div>
      </div>

    )
  }
}



Type.propTypes = {
  types: React.PropTypes.array, 
  addNewTypeText: React.PropTypes.string,
  addNewSubTypeText: React.PropTypes.string, 
  selectedType: React.PropTypes.string
}


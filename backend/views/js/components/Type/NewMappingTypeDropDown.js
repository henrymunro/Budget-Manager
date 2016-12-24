import React from 'react'
import InlineEdit from 'react-edit-inline'
import cx from 'classnames'

import AccountsDropDown from '../Accounts/AccountsDropDown'

import baseStyles from 'styles/base.css'
import styles from 'styles/components/TypeDropDown.css'


import {
  updateAddNewMappingType,
  expandAddNewMappingTypeDropDown,
  collapseAddNewMappingTypeDropDown,
  updateNewMappingHoverType
} from '../../actions/typeActions'


export default class NewMappingTypeDropDown extends React.Component {

  componentWillMount(){
  }

  // Updates the hovered value in the in the store to reveal subtypes in the open drop down
  updateHoveredTypeInDropDown(e){
    const hoveredType = e.target.closest('li').attributes.getNamedItem('data-type').value 
    this.props.dispatch(updateNewMappingHoverType(hoveredType))
  }

   // Updates the hovered value in the in the store to reveal subtypes in the open drop down
  clearHoveredTypeInDropDown(e){
    this.props.dispatch(updateNewMappingHoverType(''))
  }

  // Updates the value of type and subType when user click in the dropdown
  onDropDownTypeChange(e){
    const selectedType = e.target.attributes.getNamedItem('data-type').value 
    const selectedSubType = e.target.attributes.getNamedItem('data-sub-type').value 
    this.props.dispatch(updateAddNewMappingType(selectedType, selectedSubType))
  }

  toggleDropDown(e){
    this.props.dispatch(expandAddNewMappingTypeDropDown())
  }
  collapseAllDropDowns(e){
    this.props.dispatch(collapseAddNewMappingTypeDropDown())
  }




  render () {
    const { selectedType, selectedSubType, isDropDownVisible, hoverType} = this.props.types.addNewMapping
    const { types } = this.props.types

    // Grabs the distinct types
    const distinctTypes = [...new Set(types.map(item => item.BudgetType))]

    //Loops over distinct type to build up each sublist 
    const typeList = distinctTypes.map((type, typeKey)=> {
      // Grabs the subType items for the current type 
      const filteredSubType = types.filter((item)=>{
        if (item.BudgetType === type){
          return item
        }
      })

      //Loops over the filtered subtypes and creates list
      const subTypeList = filteredSubType.map((subTypeRow, subTypeKey)=>{
        const {BudgetSubType, UserBudgetType_id} = subTypeRow
        return <li data-user-type-id={UserBudgetType_id} 
                    key={subTypeKey}
                    data-type={type}
                    data-sub-type={BudgetSubType}
                    className={styles.subTypeListElement}
                    onClick={this.onDropDownTypeChange.bind(this)}
                >{BudgetSubType}</li> 
      })

      //Determines if the current sublist should be visible
      const subTypeClassName = cx({
        // [styles.subTypeListShow]: type === hoverTypeForExpandedDropDown,
        [styles.subTypeListHide]: type != hoverType,
        [styles.subTypeList]: true
      })
      // console.log( 'SubTypeClasss: ', ((type === hoverTypeForExpandedDropDown) && expandTypeDropDown), subTypeClassName)

      const typeClassName = cx({
        [styles.typeListHover]: type === hoverType,
        [styles.typeListElement]: true
      })

      return <li key={typeKey}
                  data-type={type}
                  className={typeClassName}
                  onMouseEnter={this.updateHoveredTypeInDropDown.bind(this)}
                  onMouseLeave={this.clearHoveredTypeInDropDown.bind(this)}> 
                {type} 
                <ul className={subTypeClassName} data-type={type}> {subTypeList}</ul> 
              </li>
    })

    const dropDownClass = cx ({
      [styles.hideDropDown]: !isDropDownVisible,
      [styles.dropDown]: true
    })


    return (

        <div>
          <div onClick={this.toggleDropDown.bind(this)}>
            {selectedType +', '+selectedSubType}
          </div>
          <ul className={dropDownClass} onMouseLeave={this.collapseAllDropDowns.bind(this)}>
            {typeList}
          </ul>
        </div>
      )
    }
  
}


NewMappingTypeDropDown.propTypes = {

}

import React from 'react'
import InlineEdit from 'react-edit-inline'
import cx from 'classnames'
import moment from 'moment'
import { StickyContainer, Sticky } from 'react-sticky';

import { updateDescription, saveDescription, updateSplitValue, saveSplitValue } from 'js/actions/ledgerActions'
import { getGraphGroupedByType } from 'js/actions/graphActions'

import styles from 'styles/components/LedgerTable.css'
import baseStyles from 'styles/base.css'
import TypeDropDown from '../Type/TypeDropDown'

export default class LedgerTable extends React.Component {

  updatedDescription(e){
    //InlineEdit element send params attribute on change
    const ledger_id = Object.keys(e)[0]
    const description = e[ledger_id]
    this.props.dispatch(updateDescription(ledger_id, description))    
    this.props.dispatch(saveDescription(ledger_id, description, this.props.axios))
  }

  updateSplit(e){
    const Split = e.target.value
    const User_Ledger_id = e.target.attributes.getNamedItem('data-ledger-id').value
    this.props.dispatch(saveSplitValue(User_Ledger_id, Split, this.props.axios))
        .then((res)=>{
          this.props.dispatch(updateSplitValue(User_Ledger_id, Split))     
          this.props.dispatch(getGraphGroupedByType(this.props.axios)) //update graph 
        })
  }


  render () {
    const { ledgerItems, typeDropDown, ...other} = this.props.ledger
    const { types, distinctTypes } = this.props.types
    // const { typeFilter, accountFilter, updatedFilter }= this.props.ledger.filters
    const { axios, data } = this.props

    // // Grabs the Ledger items to diplay 
    // const filteredLedger = ledgerItems.filter((row, yearMonth)=> { 
    //     return (
    //       row.YearMonth === this.props.ledger.yearMonth.selectedValue
    //       && (row.BudgetType === typeFilter || typeFilter==='false' )
    //       && (row.AccountName === accountFilter || accountFilter==='false' )  
    //       && (updatedFilter==='false' || row.Updated===0)
    //       )
    //   })

    //Loads in Type drop down constants 
    const { userLedgerDropDownShow, hoverType } = typeDropDown

    const tableRows = data.map((row, key) => {
      const { Ammount, User_Ledger_id, Description, UploadedDescription, BudgetType, BudgetSubType, Split } = row
      //Logic to work out if drop down should be showing
      const expandTypeDropDown = (Number(userLedgerDropDownShow) === Number(User_Ledger_id))
      // Ensures that the changing hover type is only passed to the Drop down that is expanded (to prevent every hidden drop down rendering)
      const hoverTypeForExpandedDropDown = expandTypeDropDown ? hoverType : ''
      //Props to pass to the type drop down
      const {...typesProps } = {User_Ledger_id, hoverTypeForExpandedDropDown, BudgetType, BudgetSubType, types, expandTypeDropDown, distinctTypes, axios}
      return <tr key={key} className=''>
               <td className={baseStyles.tableRow + ' ' + styles.dateCol}>
                 {moment(row.Date).format('YYYY-MM-DD')}
               </td>
               <td className={baseStyles.tableRow + ' ' + styles.amountCol}>
                 {Ammount}
               </td>

               <td className={baseStyles.tableRow + ' ' + styles.descriptionCol}>
                <span title={UploadedDescription}>
                   <InlineEdit
                    data-ledger-id={User_Ledger_id}
                    activeClassName=''
                    text={Description}
                    paramName={String(User_Ledger_id)}
                    change={this.updatedDescription.bind(this)} />
                  </span>
               </td>
               <td className={baseStyles.tableRow + ' ' + styles.typeCol}>
                  <TypeDropDown {...typesProps } dispatch={this.props.dispatch} />
                </td>
                <td className={baseStyles.tableRow + ' ' + styles.splitCol}>
                  <input 
                  className={styles.splitInput}
                  type='number'  
                  min='1' 
                  max='10' 
                  value={Split}
                  data-ledger-id={User_Ledger_id}
                  onChange={this.updateSplit.bind(this)}/> 
               </td>
             </tr>
      })

      return (

          <table className='striped'> 
            <tbody>
              {tableRows}
            </tbody>
          </table>
      )
    }

}

LedgerTable.propTypes = {
  ledgerItems: React.PropTypes.arrayOf(React.PropTypes.shape({
    // Ammount: React.PropType.string, 
    // User_Ledger_id: React.PropType.number,
    // Description: React.PropType.string, 
    // UploadedDescription: React.PropType.string, 
    // BudgetType: React.PropType.string, 
    // BudgetSubType: React.PropType.string, 
  })),
  changes: React.PropTypes.object
}

import React from 'react'
import InlineEdit from 'react-edit-inline'
import cx from 'classnames'
import moment from 'moment'

import baseStyles from 'styles/base.css'

import TypeDropDown from '../Type/TypeDropDown'

export default class LedgerTable extends React.Component {

  render () {
    const { ledgerItems, typeDropDown, ...other} = this.props.ledger
    const { types } = this.props.types
    const { changes, axios } = this.props

    const filteredLedger = ledgerItems.filter((row, yearMonth)=> { 
        return row.YearMonth === this.props.ledger.yearMonth.selectedValue
      })

    //Loads in Type drop down constants 
    const { userLedgerDropDownShow, hoverType } = typeDropDown

    const tableRows = filteredLedger.map((row, key) => {
        const { Ammount, User_Ledger_id, Description, UploadedDescription, BudgetType, BudgetSubType } = row
        //Logic to work out if drop down should be showing
        const expandTypeDropDown = (Number(userLedgerDropDownShow) === Number(User_Ledger_id))
        // Ensures that the changing hover type is only passed to the Drop down that is expanded (to prevent every hidden drop down rendering)
        const hoverTypeForExpandedDropDown = expandTypeDropDown ? hoverType : ''
        //Props to pass to the type drop down
        const {...typesProps } = {User_Ledger_id, hoverTypeForExpandedDropDown, BudgetType, BudgetSubType, types, expandTypeDropDown, axios}
        return <tr key={key} className=''>
                 <td className=''>
                   {moment(row.Date).format('YYYY-MM-DD')}
                 </td>
                 <td className=''>
                   {Ammount}
                 </td>

                 <td className=''>
                  <span title={UploadedDescription}>
                     <InlineEdit
                      data-ledger-id={User_Ledger_id}
                      activeClassName=''
                      text={Description}
                      paramName={String(User_Ledger_id)}
                      change={changes.onDescriptionChange} />
                    </span>
                 </td>
                 <td className=''>
                    <TypeDropDown {...typesProps } dispatch={this.props.dispatch} />
                  </td>
               </tr>
      })

      return (

        <div>    
           <table className='table table-striped'>
            <tbody>
              <tr>
                <th>
                  Date
                </th>
                <th>
                  Ammount
                </th>
                <th>
                  Description
                </th>
                <th>
                  Type
                </th>
              </tr>
              {tableRows}
            </tbody>
          </table>
        </div>
      )
    }

}

LedgerTable.propTypes = {
  ledgerItems: React.PropTypes.array,
  changes: React.PropTypes.object
}

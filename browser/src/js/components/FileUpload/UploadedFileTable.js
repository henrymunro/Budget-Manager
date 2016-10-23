import React from 'react'
import InlineEdit from 'react-edit-inline'
import cx from 'classnames'

import AccountsDropDown from '../Accounts/AccountsDropDown'

import baseStyles from 'styles/base.css'
import styles from 'styles/components/UploadedFileTable.css'

export default class UploadedFileTable extends React.Component {

  render () {
    const { parsedFile, id, ...other } = this.props
    const fatalParseError = parsedFile.result.fileFatalError,
      contents = parsedFile.result.contents,
      name = parsedFile.name,
      error = parsedFile.error

    if (error) {
      return (<div>
                There was an error reading file
                {name}
              </div>)
    }else {
      const tableRows = contents.map((row, key) => {
        let dateErrorStyle = cx({[styles.elementError]: row.Errors.dateError}) || '',
          ammountErrorStyle = cx({[styles.elementError]: row.Errors.ammountError}),
          descriptionErrorStyle = cx({[styles.elementError]: row.Errors.descriptionError}),
          rowErrorStyle = cx({[styles.rowError]: row.Errors.rowError})
        return <tr key={key} className={rowErrorStyle}>
                 <td className={dateErrorStyle}>
                   {row.date}
                 </td>
                 <td className={ammountErrorStyle}>
                   {row.ammount}
                 </td>
                 <td className={descriptionErrorStyle}>
                   {row.description}
                 </td>
               </tr>
      })

      return (

        <div>
          <h4>{name}</h4>
          <AccountsDropDown {...other} selected={parsedFile.selectedAccount} id={id} />         
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
              </tr>
              {tableRows}
            </tbody>
          </table>
        </div>
      )
    }
  }
}
// <UploadedToStatusBar uploadedToStatus={uploadedToStatus} />

UploadedFileTable.propTypes = {
  parsedFile: React.PropTypes.object
}

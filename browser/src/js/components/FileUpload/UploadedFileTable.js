import React from 'react'
import InlineEdit from 'react-edit-inline'
import cx from 'classnames'
import { StickyContainer, Sticky } from 'react-sticky'

import { saveFileToDB } from 'js/actions/fileUploadActions'

import AccountsDropDown from 'js/components/Accounts/AccountsDropDown'

import baseStyles from 'styles/base.css'
import styles from 'styles/components/UploadedFileTable.css'

export default class UploadedFileTable extends React.Component {

  saveFileToDB(e){
    const fileKey = e.target.attributes.getNamedItem('data-file-id').value
    const fileToSave = this.props.fileUpload.parsedFiles[fileKey]
    console.log('Saving file to DB: ', fileToSave)
    this.props.dispatch(saveFileToDB(fileToSave, this.props.axios))
  }

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
                 <td className={dateErrorStyle + ' ' + baseStyles.tableRow}>
                   {row.date}
                 </td>
                 <td className={ammountErrorStyle + ' ' + baseStyles.tableRow}>
                   {row.ammount}
                 </td>
                 <td className={descriptionErrorStyle + ' ' + baseStyles.tableRow}>
                   {row.description}
                 </td>               
               </tr>
      })

      return (
        <div>
          <StickyContainer>
            <div className='col s12 l9 card'>
              <h4>{name}</h4>
                     
               <table className='striped'>
                <tbody>
                  <tr>
                    <th className={baseStyles.tableRow}>
                      Date
                    </th>
                    <th className={baseStyles.tableRow}>
                      Ammount
                    </th>
                    <th className={baseStyles.tableRow}>
                      Description
                    </th>
                  </tr>
                  {tableRows}
                </tbody>
              </table>
            </div>
            <Sticky>
              <div className="col s12 l3 card">
                <AccountsDropDown {...other} selected={this.props.parsedFile.selectedAccount} dispatch={this.props.dispatch} />  
                <button className='btn' data-file-id={this.props.id} onClick={this.saveFileToDB.bind(this)}>Sav!e</button>
              </div>
            </Sticky>
          </StickyContainer>
        </div>
      )
    }
  }
}
// <UploadedToStatusBar uploadedToStatus={uploadedToStatus} />

UploadedFileTable.propTypes = {
  parsedFile: React.PropTypes.object
}

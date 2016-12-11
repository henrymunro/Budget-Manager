import React from 'react'
import InlineEdit from 'react-edit-inline'
import cx from 'classnames'
import { StickyContainer, Sticky } from 'react-sticky'

import { saveFileToDB } from 'js/actions/fileUploadActions'

import AccountsDropDown from 'js/components/Accounts/AccountsDropDown'
import { getGraphGroupedByType } from 'js/actions/graphActions'

import baseStyles from 'styles/base.css'
import styles from 'styles/components/UploadedFileTable.css'

export default class UploadedFileTable extends React.Component {

  saveFileToDB(e){
    const fileKey = e.target.attributes.getNamedItem('data-file-id').value
    const fileToSave = this.props.fileUpload.parsedFiles[fileKey]
    console.log('Saving file to DB: ', fileToSave)
    this.props.dispatch(saveFileToDB(fileToSave, this.props.axios))
        .then((res)=>{
          this.props.dispatch(getGraphGroupedByType(this.props.axios)) //update graph 
        })
  }

  render () {
    const { parsedFile, id, ...other } = this.props
    const fatalParseError = parsedFile.result.fileFatalError,
          contents = parsedFile.result.contents
    const { name, error, validatedUploadFileFail, validationFailCount } = parsedFile

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


        const rowAlreadyUploaded = (row.fileContentsAlreadyUploaded==1) ? <span title="Entry had previously been uploaded"><i className="tiny material-icons">error</i></span>: <div/>

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
                 <td className= {baseStyles.tableRow}>
                   {rowAlreadyUploaded}
                 </td>            
               </tr>
      })

      const fileFailValidation = (validatedUploadFileFail == 1 )? <a href="#!" className="collection-item" id={styles.fileFailValidation}>File has previsouly been uploaded!</a>:<div/>  

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
                    <th className={baseStyles.tableRow}></th>
                  </tr>
                  {tableRows}
                </tbody>
              </table>
            </div>
            <Sticky>
              <div className="col s12 l3 card">
                 <div className="collection">
                  {fileFailValidation}
                  <a href="#!" className="collection-item"><span className="new badge">{contents.length - validationFailCount}</span>New entries</a>
                  <a href="#!" className="collection-item"><span className="badge red">{validationFailCount}</span>Previously uploaded</a>
                  
                </div>
                <AccountsDropDown {...other} selected={this.props.parsedFile.selectedAccount} dispatch={this.props.dispatch} />  
                <a className="waves-effect waves-light btn center-align" 
                    data-file-id={this.props.id}
                    onClick={this.saveFileToDB.bind(this)}>Save</a>
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

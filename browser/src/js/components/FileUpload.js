import React from 'react'
import { connect } from 'react-redux'

import { fetchUser } from '../actions/userActions'
import { updateHeading } from '../actions/layoutActions'
import { filesUploaded, saveFileToDB, updateSelectedAccountAction } from '../actions/fileUploadActions'
import { getAccounts } from '../actions/accountsActions'
import { getYearMonth, getLedger } from '../actions/ledgerActions'

import AccountsDropDown from './Accounts/AccountsDropDown'
import Footer from './HomePage/Footer'
import Header from './HomePage/Header'
import UploadedFileTable from './FileUpload/UploadedFileTable'
// import PhotoGrid from './HomePage/PhotoGrid'

var _ = require('lodash')

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    heading: store.layout.heading,
    axios: store.axios.axios,
    fileUpload: store.fileUpload,    
    accounts: store.accounts.accounts,
    ledger: store.ledger
  }
})
export default class FileUpload extends React.Component {
  componentWillMount () {
    this.props.dispatch(getAccounts(this.props.axios))
    // this.props.dispatch(getYearMonth(this.props.axios))    
    // this.props.dispatch(getLedger(this.props.axios))
  }

  fileSelected (e) {
    const files = e.target.files
    let filesArray = []
    _.forEach(files, (file) => {
      filesArray.push(file)
    })
    this.props.dispatch(filesUploaded(filesArray, this.props.axios))
  }

  saveFileToDB(e){
    const fileKey = e.target.attributes.getNamedItem('data-file-id').value
    const fileToSave = this.props.fileUpload.parsedFiles[fileKey]
    console.log('Saving file to DB: ', fileToSave)
    this.props.dispatch(saveFileToDB(fileToSave, this.props.axios))
  }


  render () {
    const { user, fileUpload, accounts } = this.props
    let parsedFilesRendered = fileUpload.parsedFiles.map((file, key) => {
      console.log('KEY: ', key)
      return <div key={key}>
      <button className='btn' data-file-id={key} onClick={this.saveFileToDB.bind(this)}>Sav!e</button>
      <UploadedFileTable parsedFile={file} accounts={accounts} dispatch={this.props.dispatch} id={key}/>
      </div>
    })

    return (
      <div className='container'>
        <h3>File upload page</h3>
        <div class='container' id='uploadFileCont'>
          <h3>Upload a file:</h3>
          <div class='container'>
            <input
              type='file'
              id='selectFiles'
              accept='.csv'
              name='files[]'
              multiple
              onChange={this.fileSelected.bind(this)} />
          </div>
        </div>
        <div className='container'>
          {parsedFilesRendered}
        </div>
      </div>
    )
  }
}


FileUpload.propTypes = {
  user: React.PropTypes.object,
  fileUpload: React.PropTypes.object,
  accounts: React.PropTypes.array
}

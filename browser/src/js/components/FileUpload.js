import React from 'react'
import { connect } from 'react-redux'

import { fetchUser } from '../actions/userActions'
import { updateHeading } from '../actions/layoutActions'
import { filesUploaded, saveFileToDB, updateSelectedAccountAction, getPreviousUploadFiles } from '../actions/fileUploadActions'
import { getAccounts } from '../actions/accountsActions'
import { getYearMonth, getLedger } from '../actions/ledgerActions'

import AccountsDropDown from './Accounts/AccountsDropDown'
import Footer from './HomePage/Footer'
import Header from './HomePage/Header'
import UploadedFileTable from './FileUpload/UploadedFileTable'
import PreviousUploadFiles from './FileUpload/PreviousUploadFiles'
// import PhotoGrid from './HomePage/PhotoGrid'

import styles from 'styles/components/UploadedFileTable.css'

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
    this.props.dispatch(getPreviousUploadFiles(this.props.axios))
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


  render () {
    const { user, fileUpload, accounts } = this.props
    const { ...other } = this.props
    let parsedFilesRendered = fileUpload.parsedFiles.map((file, key) => {
      console.log('KEY: ', key)
      return <div key={key} className='row'>      
      <UploadedFileTable {...other} parsedFile={file} accounts={accounts} dispatch={this.props.dispatch} id={key}/>
      </div>
    })

    return (
      <div>
        <div className="row">
            <PreviousUploadFiles previouslyUploadedFiles={fileUpload.previouslyUploadedFiles} />
        </div>
        <div className='row'>
          <div className="col s12 l9 card">
            <h4>Upload a file:</h4>
            <div>
              <input
                type='file'
                id={styles.selectFiles}
                accept='.csv'
                name='files[]'
                multiple
                onChange={this.fileSelected.bind(this)} />
            </div>
          </div>
          <div>
            {parsedFilesRendered}
          </div>
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

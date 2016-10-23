import React from 'react'

import baseStyles from 'styles/base.css'
import styles from 'styles/components/UploadedToStatusBar.css'
import cx from 'classnames'

export default class UploadedStatusBox extends React.Component {
  radioUpdate (event) {
    let websiteName = event.target.attributes.name.nodeValue
    let status = event.target.attributes.value.nodeValue
    event.stopPropagation()
    this.props.updateUploadStatus(this.props.photo_id, websiteName, status)
  }

  render () {
    const { uploadedToStatus } = this.props

    const uploadedStatusBox = uploadedToStatus.map((uploadedToStatus, id) => {
      const name = uploadedToStatus.websiteName
      const status = ['notUploaded', 'pending', 'accepted', 'rejected']
      const uploadedStatusRow = status.map((status, row_id) => {
        const isChecked = status === uploadedToStatus.status
        // console.log(status, isChecked)
        return <td key={name + ' ' + row_id}>
                 <input
                   type='radio'
                   name={name}
                   value={status}
                   checked={isChecked}
                   onChange={this.radioUpdate.bind(this)}>
                 </input>
               </td>
      })

      return <tr key={name + ' ' + id}>
               <td>
                 <p>
                   {name}
                 </p>
               </td>
               {uploadedStatusRow}
             </tr>
    })

    return (
      <form action='#'>
        <table>
          <thead>
            <tr>
              <td>
              </td>
              <td>
                Not Uploaded
              </td>
              <td>
                Pending
              </td>
              <td>
                Accepted
              </td>
              <td>
                Rejected
              </td>
            </tr>
          </thead>
          <tbody>
            {uploadedStatusBox}
          </tbody>
        </table>
      </form>
    )
  }
}

UploadedStatusBox.propTypes = {
  uploadedToStatus: React.PropTypes.array,
  photo_id: React.PropTypes.number
}

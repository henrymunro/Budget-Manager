import React from 'react'
import InlineEdit from 'react-edit-inline'

import UploadedToStatusBar from './UploadedToStatusBar'
import Keywords from './Keywords'
import UploadStatusBox from './UploadStatusBox'

import baseStyles from 'styles/base.css'
import styles from 'styles/components/PhotoUnit.css'

export default class PhotoUnit extends React.Component {
  updateTitle (event) {
    const title = event.message
    event.stopPropagation()
    this.props.updateTitle(this.props.photo.photo_id, title)
  }

  render () {
    const { photo, title, keywords, uploadedToStatus, photo_id } = this.props.photo
    const { updateTitle, updateKeywords, updateUploadStatus } = this.props

    return (

      <div className={'panel panel-info ' + styles.PhotoUnit_div + ' ' + baseStyles.clearfix}>
        <div className='panel panel-heading clearfix'>
          <InlineEdit
            activeClassName={styles.editing}
            text={title}
            paramName='message'
            change={this.updateTitle.bind(this)} />
        </div>
        <div className={styles.image_div + ' col-sm-6'}>
          <img
            className={styles.image}
            src={photo}
            alt={title}
            height='300'
            width='500' />
        </div>
        <div className={styles.Keywords_div + ' col-sm-6'}>
          <Keywords keywords={keywords} photo_id={photo_id} updateKeywords={updateKeywords} />
        </div>
        <div>
          <UploadStatusBox photo_id={photo_id} uploadedToStatus={uploadedToStatus} updateUploadStatus={updateUploadStatus} />
        </div>
      </div>

    )
  }
}
// <UploadedToStatusBar uploadedToStatus={uploadedToStatus} />

PhotoUnit.propTypes = {
  photo: React.PropTypes.object
}

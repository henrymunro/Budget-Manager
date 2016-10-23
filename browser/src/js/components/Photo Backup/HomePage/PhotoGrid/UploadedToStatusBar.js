import React from 'react'

import baseStyles from 'styles/base.css'
import styles from 'styles/components/UploadedToStatusBar.css'
import cx from 'classnames'

export default class UploadedToStatusBar extends React.Component {

  show (event) {
    // console.log('element over!!', event)
    var targetdiv = event.target.closest('div')
    // console.log(target)
    console.log(targetdiv.getElementById('div').childNodes)
  }

  render () {
    const { uploadedToStatus } = this.props

    const mappedUploadedToStatus = uploadedToStatus.map(function (uploadedToStatus, id) {
      let className = cx(styles.website, {
        [styles['website_' + uploadedToStatus.website.name]]: true,
        [styles.pending]: uploadedToStatus.status === 'pending',
        [styles.accepted]: uploadedToStatus.status === 'accepted',
        [styles.rejected]: uploadedToStatus.status === 'rejected'
      })
      return <il key={id} className={className}>
             </il>
    })
    return (
      <div onMouseEnter={this.show} className={styles.UploadedToStatusBar_div + ' ' + baseStyles.clearfix}>
        <ul className={styles.mappedUploadedToStatus_ul}>
          {mappedUploadedToStatus}
        </ul>
        <div className={styles.websiteUpdate_div}>
          Contents goes in here
        </div>
      </div>
    )
  }
}

UploadedToStatusBar.propTypes = {
  uploadedToStatus: React.PropTypes.array
}

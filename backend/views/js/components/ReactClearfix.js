import React from 'react'
import cx from 'classnames'

import baseStyles from 'styles/base.css'
import styles from 'styles/components/PhotoUnit.css'

export default class ReactClearfix extends React.Component {
  componentWillMount () {
    console.log('startinggg')
  }

  render () {
    console.log('this is a test!!')
    return (
      <div className={styles.div}>
        <div className={baseStyles.clearfix}>
          <h1 className={styles.title}>IMAGES</h1>
          <img
            className={styles.image}
            src='/images/image1.JPG'
            alt='title'
            height='300'
            width='500' />
        </div>
      </div>

    )
  }
}

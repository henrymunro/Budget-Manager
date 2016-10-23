import React from 'react'

import styles from 'styles/components/Keywords.css'
import cx from 'classnames'

export default class Keywords extends React.Component {

  textAreaChange (event) {
    const textArea = event.target
    event.stopPropagation()
    const keywords = textArea.value.split(',')
    this.props.updateKeywords(this.props.photo_id, keywords)
  }

  render () {
    const { keywords, photo_id } = this.props
    let mappedKeywords = ''
    keywords.map(function (keyword, id) {
      if (id < keywords.length - 1) {
        if (keyword.trim() == '') {return }
        mappedKeywords = mappedKeywords + keyword.trim() + ', '
      }else {
        mappedKeywords = mappedKeywords + keyword.trimLeft()
      }
    })

    return (
      <div className={'panel panel-danger ' + styles.panel}>
        <div className={'panel panel-heading ' + styles['panel-heading']}>
          Keywords
        </div>
        <textarea className={styles.textArea} value={mappedKeywords} onChange={this.textAreaChange.bind(this)}>
        </textarea>
      </div>
    )
  }
}

Keywords.propTypes = {
  keywords: React.PropTypes.array,
  photo_id: React.PropTypes.number
}

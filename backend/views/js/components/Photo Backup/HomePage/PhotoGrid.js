import React from 'react'
import { connect } from 'react-redux'

import PhotoUnit from './PhotoGrid/PhotoUnit'

import { fetchPhotosHome, updateKeywords, updateUploadStatus, updateTitle } from 'js/actions/photosHomeActions'

@connect((store) => {
  return {
    photos: store.photosHome.photos
  }
})

export default class PhotoGrid extends React.Component {
  componentWillMount () {
    this.props.dispatch(fetchPhotosHome())
  }

  updateKeywords (photo_id, keywords) {
    this.props.dispatch(updateKeywords(photo_id, keywords))
  }

  updateUploadStatus (photo_id, websiteName, status) {
    this.props.dispatch(updateUploadStatus(photo_id, websiteName, status))
  }

  updateTitle (photo_id, title) {
    this.props.dispatch(updateTitle(photo_id, title))
  }

  render () {
    const { photos } = this.props
    const mappedPhotos = photos.map((photo, id) => <PhotoUnit
                                                     key={id}
                                                     photo={photo}
                                                     updateTitle={this.updateTitle.bind(this)}
                                                     updateKeywords={this.updateKeywords.bind(this)}
                                                     updateUploadStatus={this.updateUploadStatus.bind(this)} />)

    return (
      <div>
        {mappedPhotos}
      </div>
    )
  }

}

PhotoGrid.propTypes = {
  photos: React.PropTypes.arrayOf(React.PropTypes.object)
}

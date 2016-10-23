export function fetchPhotosHome () {
  const photos = [
    'image1.JPG',
    'image2.JPG',
    'image3.JPG',
    'image4.JPG',
    'image5.JPG'
  ]
  const filePath = '/images/'

  const mappedPhotos = photos.map((photo, id) => {
    return {
      photo: filePath + photo,
      title: photo,
      photo_id: id,
      keywords: ['Key words are blah ', photo, 'a'],
      uploadedToStatus: [{
        websiteName: 'shutterStock',
        websiteRank: 1,
        sold: false,
        status: 'pending',
        annotation: 'pending'
      }, {
        websiteName: 'bigStock',
        websiteRank: 1,
        sold: false,
        status: 'accepted',
        annotation: 'pending'
      }, {
        websiteName: 'dreamstime',
        websiteRank: 1,
        sold: false,
        status: 'notUploaded',
        annotation: 'pending'
      }]

    }})

  return {
    type: 'FETCH_PHOTOS_FULFILLED',
    payload: mappedPhotos
  }
}

export function updateTitle (photo_id, title) {
  return {
    type: 'UPDATE_TITLE',
    payload: {
      photo_id: photo_id,
      title: title
    }
  }
}

export function updateKeywords (photo_id, keywords) {
  return {
    type: 'UPDATE_KEYWORDS',
    payload: {
      photo_id: photo_id,
      keywords: keywords
    }
  }
}

export function updateUploadStatus (photo_id, websiteName, status) {
  return {
    type: 'UPDATE_UPLOAD_STATUS',
    payload: {
      photo_id: photo_id,
      websiteName: websiteName,
      status: status
    }
  }
}

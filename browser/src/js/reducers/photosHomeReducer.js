const _ = require('lodash')

export default function reducer (state = {
    tempate: {
      photo: 'filePath',
      title: 'photoTitle',
      keywords: 'listOfKeywords',
      uploadedTo: [{
        website: {name: 'shutterStock', rank: 1},
        sold: false,
        status: 'pending',
        annotation: 'pending'
      }]

    },
    photos: [],
    fetching: false,
    fetched: false,
    error: null
  } , action) {
  switch (action.type) {
    case 'FETCH_PHOTOS': {
      return {...state, fetching: true}
    }
    case 'FETCH_PHOTOS_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'FETCH_PHOTOS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        photos: action.payload
      }
    }
    case 'ADD_PHOTO': {
      return [...state.photos, action.payload]
    }
    case 'UPDATE_TITLE': {
      const { photo_id, title } = action.payload
      const index = _.findIndex(state.photos, function (obj) {return obj.photo_id == photo_id })
      const updatedPhoto = Object.assign({}, state.photos[index], {title: title})
      return {
        ...state,
        photos: [
          ...state.photos.slice(0, index),
          updatedPhoto,
          ...state.photos.slice(index + 1)
      ]}
    }
    case 'UPDATE_KEYWORDS': {
      const { photo_id, keywords } = action.payload
      const index = _.findIndex(state.photos, function (obj) {return obj.photo_id == photo_id })
      const updatedPhoto = Object.assign({}, state.photos[index], {keywords: keywords})
      return {
        ...state,
        photos: [
          ...state.photos.slice(0, index),
          updatedPhoto,
          ...state.photos.slice(index + 1)
      ]}
    }
    case 'UPDATE_UPLOAD_STATUS': {
      const { photo_id, websiteName, status } = action.payload
      // Find photo updated
      const photoIndex = _.findIndex(state.photos, function (obj) {return obj.photo_id == photo_id })
      const updatedPhoto = Object.assign({}, state.photos[photoIndex])
      // Find the entry for the website updated
      const updatedStatus = updatedPhoto.uploadedToStatus
      const statusIndex = _.findIndex(updatedStatus, function (obj) {return obj.websiteName == websiteName })
      updatedStatus[statusIndex].status = status
      return {
        ...state,
        photos: [
          ...state.photos.slice(0, photoIndex),
          updatedPhoto,
          ...state.photos.slice(photoIndex + 1)
        ]
      }
    }
  }

  return state
}

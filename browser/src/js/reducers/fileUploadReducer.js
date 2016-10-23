export default function reducer (state = {
    fetching: false,
    fetched: false,
    error: null,
    parsedFiles: []
  } , action) {
  switch (action.type) {
    case 'FILES_UPLOADED_FULFILLED': {
      const parsedFiles = action.payload.data
      return {...state, parsedFiles: parsedFiles}
    }

    case 'UPLOAD_FILE_UPDATE_ACCOUNT':{
      const file_id = action.payload.file_id 
      const account_id = action.payload.account_id
      const updatedFile = Object.assign({}, state.parsedFiles[file_id], {selectedAccount: account_id})
      return {...state, 
        parsedFiles: [
          ...state.parsedFiles.slice(0, file_id),
          updatedFile,
          ...state.parsedFiles.slice(file_id + 1)
      ]}
    }
  }

  return state
}

//Takes the array of the raw files input and read them into a CSV string
//Then sends to the server to be parsed and validated 
export function filesUploaded (files, axios) {
  //readAndSendFiles returns a promise for the Thunk middleware
  function readAndSendFiles () {
    return new Promise((resolveOuter, rejectOuter) => {
      let requests = files.map((file) => {
        //Promise for each async file read
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = function (e) {
            console.log((file))
            const content = e.target.result
            const fileDetails = {
              name: file.name,
              lastModifiedDate: file.lastModifiedDate,
              content: content
            }
            resolve(fileDetails)
          }
          reader.readAsText(file)
        })
      })

      Promise.all(requests).then((res) => {
        return axios.request.post(axios.URLS.fileUpload, {files: res}).then((parsedFiles) => {
          resolveOuter(parsedFiles)
        })
      }).catch((err) => {
        console.log('ERROR: ', err)
        rejectOuter(err)
      })
    })
  }

  return {
    type: 'FILES_UPLOADED',
    payload: readAndSendFiles()
  }
}

export function saveFileToDB (file, axios) {
  console.log('Sending file to DB')

  return {
    type: 'SAVE_FILE_TO_DB',
    payload: axios.request.post(axios.URLS.saveFile, {file: file})
  }
}


export function updateSelectedAccountAction (file_id, account_id) {
  return {
    type: 'UPLOAD_FILE_UPDATE_ACCOUNT',
    payload: {file_id:file_id, account_id:account_id}
  }
}
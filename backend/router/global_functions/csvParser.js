const Converter = require('csvtojson').Converter
const debug = require('debug')('csvParser')
const moment = require('moment')
const _ = require('lodash')

function parseCSV (fileInput) {
  return new Promise(function (resolve, reject) {
    const fileName = fileInput.name
    const file = fileInput.content
    var converter = new Converter({
      trim: true
    })

    // Grabs the first and second line in order to determine headings
    const firstLine = file.split('\n')[0].split(','),
      firstLineValidation = _checkRowVaild(firstLine),
      secondLine = file.split('\n')[1].split(','),
      secondLineValidation = _checkRowVaild(secondLine)
    var titles, fileWithTitle

    // Attempts to determine column headings
    // If there are already headings it will drop them and then set 
    if (firstLineValidation.valid) {
      debug('No column headings removed')
      titles = firstLineValidation.titles
      fileWithTitle = titles.join([separator = ',']) + ' \n ' + file
    } else if (secondLineValidation.valid) {
      debug('Column headings detected, removing')
      titles = secondLineValidation.titles
      var fileDropHeading = file.split('\n')
      fileDropHeading.shift()
      fileWithTitle = titles.join([separator = ',']) + ' \n ' + fileDropHeading.join([separator = '\n'])
    }else {
      reject('ERROR Parsing files title')
    }

    converter.fromString(fileWithTitle, function (err, result) {
      const resultValidate = _vaildateFileColumns(result)
      resolve({
        result: resultValidate,
        error: err
      })
    })
  })
}

function _vaildateFileColumns (file) {
  const fileFatalError = false
  const vailidatedFile = file.map(function (row) {
    const date = row.date,
      ammount = row.ammount,
      description = row.description

    var dateError = false,
      ammountError = false,
      descriptionError = false,
      rowError = false

    const dateChecked = _dateChecker(date)
    if (!dateChecked.date) {
      dateError = true
      fileFatalError = true
    }else{
      row.date = dateChecked.elementReturnDate
    }
    if (!Number(ammount)) {
      ammountError = true
      fileFatalError = true
    }
    if (_dateChecker(description).date || Number(description) || description == '') {
      descriptionError = true
    }
    if (dateError || ammountError || descriptionError) {
      rowError = true
    }

    row.Errors = {
      dateError: dateError,
      ammountError: ammountError,
      descriptionError: descriptionError,
      rowError: rowError
    }
    return row
  })

  return {
    contents: vailidatedFile,
    fileFatalError: fileFatalError
  }
}

// Determines if in a row there is a date a number and an other
function _checkRowVaild (row) {
  var date = 0,
    ammount = 0,
    description = 0,
    valid = false
  const titles = row.map((elm, key) => {
    const checkDate = _dateChecker(elm)
    if (checkDate.date) {
      date = date + 1
      return 'date'
    }
    else if (Number(elm)) {
      ammount = ammount + 1
      return 'ammount'
    }else {
      description = description + 1
      return 'description'
    }
  })
  if (date * ammount * description == 1) {
    valid = true
  }
  return {
    titles: titles,
    valid: valid,
    date: date,
    ammount: ammount,
    description: description
  }
}

// Validates dates against the stored formats
function _dateChecker (test) {
  const formats = [
    'DD/MM/YYYY',
    'DD/M/YYYY',
    'D/MM/YYYY',
    'D/M/YYYY',
    'MM/DD/YYYY',
    'YYYY/DD/MM',
    'YYYY/MM/DD',
    'DD-MM-YYYY',
    'DD-M-YYYY',
    'D-MM-YYYY',
    'D-M-YYYY',
    'MM-DD-YYYY',
    'YYYY-DD-MM',
    'YYYY-MM-DD'
  ]
  var date = false, elementReturn
  _.forEach(formats, function (format, key) {
    // Test first for dd-mm-yyyy format but will search past if necessary
    if (moment(test, format, true).isValid() && date == false) {
      elementReturn = moment(test, format).format('YYYY-MM-DD')
      date = true
    }
  })
  return {
    date: date, // bolean, is Date?
    elementReturnDate: elementReturn // date formatted as dd-mm-yyyy
  }
}

module.exports = {
  parseCSV: parseCSV
}



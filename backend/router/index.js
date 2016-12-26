var express = require('express')
var router = require('./router')



module.exports = function (app) {
  app.use('/fileUpload', require('./routes/fileUpload'))
  app.use('/mappings', require('./routes/mappings'))
  app.use('/accounts', require('./routes/accounts'))   
  app.use('/ledger', require('./routes/ledger'))
  app.use('/type', require('./routes/type'))
  app.use('/graph', require('./routes/graph'))
  app.use('/log', require('./routes/log'))
  app.use('/login', require('./routes/login'))  
  app.use('/home', require('./routes/home'))

}


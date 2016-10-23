var express = require('express')
var router = express.Router()

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' })
// })

// module.exports = router

module.exports = function (app) {
  app.use('/fileUpload', require('./routes/fileUpload'))
  app.use('/mappings', require('./routes/mappings'))
  app.use('/accounts', require('./routes/accounts'))   
  app.use('/ledger', require('./routes/ledger'))
  app.use('/type', require('./routes/type'))
// app.use('/monthOverview', require('./routes/monthOverview'))
// app.use('/userOverview', require('./routes/userOverview'))
}

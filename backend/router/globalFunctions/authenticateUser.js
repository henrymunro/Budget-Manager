
const debug = require('debug')('authenticateUser')
const pool = require('mysql2/promise').createPool({host:'localhost', user: 'root', database: 'Budget'}); 


//sp_AuthenticateUser



function authenticateUser(username, password){
  return new Promise((resolve, reject)=>{
  debug('Authenticating user: '+username)
    pool.getConnection()
         .then((conn) => {
           const result = conn.query('call sp_AuthenticateUser(?,?)', [username, password])
           conn.release()
           return result;
         })
         .then((result) => {
          debug('Database authentication complete user: '+username)
          resolve(result[0][0][0])
         }).catch((err)=>{
          debug('Authentication fail user: '+username+ ', error: ' +  err)
          reject({err})
         })
  })
}


module.exports = {
  authenticateUser: authenticateUser,
}





const debug = require('debug')('authenticateUser')
const pool = require('mysql2/promise').createPool({host:'localhost', user: 'root', database: 'Budget'}); 


//sp_AuthenticateUser




function createNewUser(username, firstname, lastname, email, password){
  return new Promise((resolve, reject)=>{
  debug('Attempting to create new user: '+username)
    pool.getConnection()
         .then((conn) => {
           const result = conn.query('call sp_CreatUser(?,?,?,?,?)', [username, firstname, lastname, email, password])
           conn.release()
           return result;
         })
         .then((result) => {
          debug('Create user DB step complete: '+username, result[0][0][0])
          resolve(result[0][0][0])
         }).catch((err)=>{
          debug('Create user ERROR: '+username+ ', error: ' +  err)
          reject({err})
         })
  })
}

module.exports = {
  createNewUser: createNewUser
}




const AdminLoginRepo = require('../repository/AdminLoginRepository')
const logger = require('../../../lib/logger')
var exports = module.exports = {}

exports.Login = function(username, password, resultLogin){ 
    var result = AdminLoginRepo.CheckUsernamePassword(username, password, function(err, response){
        console.log(err, response); 
        resultLogin(null, response)
    })  
}

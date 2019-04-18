const pool = require('../../../lib/connection-db').ConnectionPool()
const connection = require('../../../lib/connection-db').Connection()
const Request = require('tedious').Request
const TYPES = require('tedious').TYPES
var exports = module.exports = {};
const adminUserModel = require("../../../models/AdminUser")

exports.CheckUsernamePassword = function(username, password, response){ 
    var result = false;
    pool.acquire(function (err, connection){
        if (err) {
            console.error(err);  
        }
    
        //use the connection as normal
        var request = new Request('select username from AdminUser where username = @username and password = @password', function(err, rowCount) {
            if (err) {
                console.error(err);
                response = result
                return result;
            } 
            console.log('rowCount: ' + rowCount);
    
            //release the connection back to the pool when finished
            result = false
            if(rowCount > 0){
                result = true
            }
            response(null, result)
            connection.release();
        });

        request.addParameter('username', TYPES.NVarChar, username)
        request.addParameter('password', TYPES.NVarChar, password)
    
        request.on('row', function(columns) {
            console.log('value: ' + columns[0].value);
        }); 
    
        connection.execSql(request)   
    })
} 
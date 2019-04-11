// var config = {
//     userName: 'sa',
//     password: 'Password123!!',
//     server: 'IQBALABDURRAHMA\\SQLSVR16K2',  
//     options: {
//         encrypt: true, 
//         database: 'IcalanDB'
//     }  
//   };  
// var connectionConfig = {
//     userName: 'sa',
//     password: 'Password123!!',
//     server: 'localhost',
//     options :{
//         encrypt: true, 
//         database: 'IcalanDB'  ,
//         port:50152
//     }
// };

// var poolConfig = {
//     min: 2,
//     max: 4,
//     log: true
// };

const config = require('../lib/config');
 
var exports = module.exports = {}

const Connection = require('tedious').Connection
const ConnectionPool = require('tedious-connection-pool')
const connection  = new Connection(global.gConfig.database.connection)    
const pool = new ConnectionPool(global.gConfig.database.connectionPool, global.gConfig.database.connection)

exports.Connection = function(){
    return connection
}
exports.ConnectionPool = function(){
    return pool
}
 

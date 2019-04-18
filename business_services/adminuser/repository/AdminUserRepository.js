const pool = require('../../../lib/connection-db').ConnectionPool()
const connection = require('../../../lib/connection-db').Connection()
const Request = require('tedious').Request
const TYPES = require('tedious').TYPES
var exports = module.exports = {}; 

exports.ListAdmin = function(response){ 
    var result = false;
    pool.acquire(function (err, connection){
        if (err) {
            console.error(err);  
        }
    
        //use the connection as normal
        var query ="select * from AdminUser order by AdminName asc"
        var request = new Request(query, function(err, rowCount, rows) {
            if (err) {
                console.error(err); 
                response(err, [])
            } 
            console.log('rowCount: ' + rowCount); 
            var results = []
            rows.forEach(function (columns) {
                var rowObject = {};
                columns.forEach(function(column) {
                    rowObject[column.metadata.colName] = column.value;
                });
                results.push(rowObject)
            });
            response(null, results)
            connection.release();
        }); 
    
        // var results = [];
        // var mAdminUser = adminUserModel.AdminUser(); 
        // request.on('row', function(columns) {
        //     // console.log(columns);
        //     results.push(columns);
        // });

        // request.on('doneProc', function(){
        // console.log("Querying is done...");
        // for(idx in results){
        //     console.log(results[idx]);
        //     //console.log(results[idx][0].value.toString()+" "+results[idx][1].value);
        // } 
        // }) 
        connection.execSql(request)   
    })
}

exports.AddAdmin = function(adminUser, response){ 
    var result = false;
    pool.acquire(function (err, connection){
        if (err) {
            console.error(err);  
        }
    
        //use the connection as normal
        var result = false;
        var query = "Insert into AdminUser VALUES (@ID, @ADMINNAME, @USERNAME, @PASSWORD, @STATUS, GETDATE(), @CREATEDBY, NULL, NULL)"
        var request = new Request(query, function(err) {
            if (err) {
                console.error(err); 
                response(err, result)
            }  
            result = true
            response(null, result)
            console.log("Insert Success"); 
            connection.release();
        });  

        request.addParameter('ID', TYPES.UniqueIdentifier, adminUser.ID)
        request.addParameter('ADMINNAME', TYPES.VarChar, adminUser.AdminName)
        request.addParameter('USERNAME', TYPES.VarChar, adminUser.UserName)
        request.addParameter('PASSWORD', TYPES.VarChar, adminUser.Password)
        request.addParameter('STATUS', TYPES.SmallInt, adminUser.Status) 
        request.addParameter('CREATEDBY', TYPES.VarChar, adminUser.CreatedBy)

        connection.execSql(request)   
    })
}

exports.DeleteAdmin = function(adminUser, response){ 
    var result = false;
    pool.acquire(function (err, connection){
        if (err) {
            console.error(err);  
        }
    
        //use the connection as normal
        var result = false;
        var query = "Delete From AdminUser where ID =  @ID"
        var request = new Request(query, function(err) {
            if (err) {
                console.error(err); 
                response(err, result)
            }  
            result = true
            response(null, result)
            console.log("Delete Success"); 
            connection.release();
        });  

        request.addParameter('ID', TYPES.UniqueIdentifier, adminUser.ID)  
        connection.execSql(request)   
    })
}


exports.UpdateAdmin = function(updateMaterial, response){ 
    var result = false;
    pool.acquire(function (err, connection){
        if (err) {
            console.error(err);  
        }
    
        //use the connection as normal
        var result = false;
        var query = "Update AdminUser set " + updateMaterial.UpdatedColumn + " where ID =  @ID"
        var request = new Request(query, function(err) {
            if (err) {
                console.error(err); 
                response(err, result)
            }  
            result = true
            response(null, result)
            console.log("Update Success"); 
            connection.release();
        });  

        request.addParameter('ID', TYPES.UniqueIdentifier, updateMaterial.ID)  
        connection.execSql(request)   
    })
}
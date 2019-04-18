const AdminUserRepo = require('../repository/AdminUserRepository')
const logger = require('../../../lib/logger')
const uid = require('uuid/v1')
var exports = module.exports = {} 
const adminUserModel = require("../../../models/AdminUser")
const set   = require("../../../lib/helper")

exports.ListAdmin = function(result){ 
    AdminUserRepo.ListAdmin(function(err, response){
        console.log(err, response);  
        result(err, response)
    })  
}

exports.AddAdmin = function( body, result){ 
    var adminUser = adminUserModel.AdminUser(); 
    
    adminUser.ID = uid()
    adminUser.AdminName = body.AdminName
    adminUser.UserName = body.Username
    adminUser.Password = body.Password
    adminUser.Status = body.Status
    adminUser.CreatedDate = body.CreatedDate
    adminUser.CreatedBy = body.CreatedBy

    AdminUserRepo.AddAdmin(adminUser, function(err, response){
        console.log(err, response);  
        result(err, response)
    })  
}

exports.DeleteAdmin = function( body, result){ 
    var adminUser = adminUserModel.AdminUser(); 
    
    adminUser.ID = body.ID 

    AdminUserRepo.DeleteAdmin(adminUser, function(err, response){
        console.log(err, response);  
        result(err, response)
    })  
}

exports.UpdateAdmin = function( body, result){    
    var data = body.Data;
    var setClause = set.UpdateSetBuilder(data)
    var updateMaterial = { ID : body.ID, UpdatedColumn : setClause}
    AdminUserRepo.UpdateAdmin(updateMaterial, function(err, response){
        console.log(err, response);  
        result(err, response)
    })  
}
var express = require('express')
var router = express.Router()
var adminloginusecase = require('../business_services/adminlogin/usecase/AdminLoginUsecase')
var adminuserusecase = require('../business_services/adminuser/usecase/AdminUserUsecase')
var auth = require('../middleware/authenticate')
const logger = require('../lib/logger')
const appTime = require('../lib/helper')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
// console.log('Request Time: ', appTime.Now())
logger.log(process.env.LOG_LEVEL, 'Request Time :' + appTime.Now())
next()
})  

router.post('/testpost', function (req, res) {
    var response = "Hello my name is " + req.body.Name + " and i live in " + req.body.Address + " and this is my message : " + req.body.Message
    res.send(response)
})

router.get('/testget', function (req, res) {
    res.send("get")
})

// real route goes here 
router.post('/admin/login', function (req, res) {
  var username = req.body.Username 
  var password = req.body.Password 
  adminloginusecase.Login(username, password, function(err, result){
    if(result){
       // create jwt token here 
      var token = auth.GenerateToken(username)
      logger.log(process.env.LOG_LEVEL, 'Route Result :' + "200")
      res.status(200).json({code : 200, access_token : token})  
    }else{
      logger.log(process.env.LOG_LEVEL, 'Route Result :' + "401")
      res.status(401).json({message:'Invalid Password / Username'})
    }
  })
})

router.post('/adminuser/list', function (req, res) {   
  
  try{
    var token = req.headers.authorization.substring(7)
    var isValid = auth.VerifyToken(token);
    if(isValid.userName != ""){
      adminuserusecase.ListAdmin(function (err, result){
        if(err == null) {
          logger.log(process.env.LOG_LEVEL, 'Route Result :' + "200")
          res.status(200).json({result}) 
        }  
      })  
    } 
  }catch(e){
    logger.log(process.env.LOG_LEVEL, 'Route Result :' + "403")
    res.status(403).json({message : "Token failed to verified"}) 
  }
  
  
})

router.post('/adminuser/add', function (req, res) {   
  try{
    var token = req.headers.authorization.substring(7)
    var isValid = auth.VerifyToken(token);
    if(isValid.userName != ""){
      // read from request body
      var body = req.body 
      adminuserusecase.AddAdmin(body, function (err, result){
        if(err == null) {
          logger.log(process.env.LOG_LEVEL, 'Route Result :' + "200")
          res.status(200).json({result}) 
        }else{
          //err
        } 
      })  
    } 
  }catch(e){
    logger.log(process.env.LOG_LEVEL, 'Route Result :' + "403")
    res.status(403).json({message:'Failed to verify token'}) 
  }  
})

router.post('/adminuser/delete', function (req, res) {   
  try{
    var token = req.headers.authorization.substring(7)
    var isValid = auth.VerifyToken(token);
    if(isValid.userName != ""){
      // read from request body
      var body = req.body 
      adminuserusecase.DeleteAdmin(body, function (err, result){
        if(err == null) {
          logger.log(process.env.LOG_LEVEL, 'Route Result :' + "200")
          res.status(200).json({result}) 
        } 
      })  
    } 
  }catch(e){
    logger.log(process.env.LOG_LEVEL, 'Route Result :' + "403")
    res.status(403).json({message:'Failed to verify token'}) 
  }  
})

router.post('/adminuser/update', function (req, res) {   
  try{
    var token = req.headers.authorization.substring(7)
    var isValid = auth.VerifyToken(token);
    if(isValid.userName != ""){
      // read from request body
      var body = req.body
      adminuserusecase.UpdateAdmin(body, function (err, result){
        if(err == null) {
          logger.log(process.env.LOG_LEVEL, 'Route Result :' + "200")
          res.status(200).json({result}) 
        } 
      })  
    } 
  }catch(e){
    logger.log(process.env.LOG_LEVEL, 'Route Result :' + "403")
    res.status(403).json({message:'Failed to verify token'}) 
  }  
})
 
module.exports = router

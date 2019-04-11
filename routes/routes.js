var express = require('express')
var router = express.Router()
var adminloginusecase = require('../business_services/adminlogin/usecase/AdminLoginUsecase')
const logger = require('../lib/logger')
const appTime = require('../lib/helper')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {


console.log('Request Time: ', appTime.Now())
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
router.post('/adminlogin', function (req, res) {
  var username = req.body.Username 
  var password = req.body.Password 
  var x = adminloginusecase.Login(username, password, function(err, result){
    if(result){
      res.status(200).json({code : 200, access_token : 't0K3n'})
    }else{
      res.status(400).json({message:'Invalid Password/Username'})
    }
  })
})

module.exports = router

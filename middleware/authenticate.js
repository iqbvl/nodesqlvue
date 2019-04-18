const jwt = require('jsonwebtoken');
var exports = module.exports = {};
const key = global.gConfig.keyofsecret;

exports.GenerateToken = function(username){
    var token = jwt.sign({userName : username}, key, {expiresIn: '24h', algorithm:'HS256'})
    return token
}

exports.VerifyToken = function(token){
    var decodedPayload = jwt.verify(token, key);
    return decodedPayload
}
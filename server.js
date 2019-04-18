const express = require('express'), bodyParser = require('body-parser'), cors = require('cors')
const app = express()
var port = 3000  // default
const logger = require('./lib/logger')    
var route = require('./routes/routes')
const config = require('./lib/config')


process.env.LOG_LEVEL = 'info'
process.env.NODE_ENV = 'development'
port = global.gConfig.node_port;

app.use(bodyParser.json());
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
app.use('/', route) 
app.listen(port, () => logger.log(process.env.LOG_LEVEL, 'Backend-Server listen on :' + port)) 
const winston = require('winston') 
// Create a server with a host and port
const pathFile = './logs/'
const fileName = 'application.log'
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: pathFile + fileName })
  ]
}); 

module.exports = logger
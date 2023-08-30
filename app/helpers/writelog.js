const fs = require('fs');
const logFile = '../logs/app.log';

fs.writeFileSync(logFile, '', 'utf-8');

function writeToLog(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
  
    fs.appendFileSync(logFile, logMessage, 'utf-8');
  }
  
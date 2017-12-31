const fetch = require('node-fetch');
const fs = require('fs')
const logFile = "./netLog.txt"
let isLogged = false;

initializeLogFile();

setInterval(() => ping("https://www.google.com"), 1000)

/****************************************************************/

function initializeLogFile(){
  fs.appendFile(logFile,`-----------------------------\nStarted Logging: ${new Date().toString()} \n`, error => {
    if (error) throw error;
    console.log("Logging Started");
  });
}

function ping(url){
  fetch(url)
  .then(request => {
    if(isLogged){
      logInfo(`Back Up:     ${new Date().toString()}\n`)
      isLogged = !isLogged;
    }
    console.log("Response: OK")
  })
  .catch(error => {
    if(!isLogged){
      logInfo(`DOWN:        ${new Date().toString()} \n`);
      isLogged = true;
    }
    console.log("NetworkDown");
  });
}

function logInfo(falureValue){
  fs.appendFile(logFile, falureValue, error => {
    if(error) throw error
  })
}

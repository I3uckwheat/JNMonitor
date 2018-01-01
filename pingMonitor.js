const fetch = require('node-fetch');
const fs = require('fs')

const logFile = "./netLog.txt"
const url = "https://www.google.com/"

let isLogged = false;

initializeLogFile();
setInterval(() => ping(url, 1000), 1000);

/****************************************************************/

function initializeLogFile(){
  fs.appendFile(logFile,`-----------------------------\nStarted Logging: ${new Date().toString()} \n`, error => {
    if (error) throw error;
    console.log("Logging Started");
  });
}

function ping(url, ms){
  Promise.race([fetch(url), promiseTimeout(ms)])
    .then(response => {
      if(isLogged){
        logConnectionRestored();
        isLogged = !isLogged;
      }
      outputResponse(response.status)
    })
    .catch(error => {
      if(!isLogged){
        logConnectionLost();
        isLogged = !isLogged;
      }
      outputNoResponse(url);
    })
}

function promiseTimeout(ms){
  return new Promise((resolve, reject) => {
    setTimeout(reject, ms, "TimedOut")
  })
}

function outputResponse(responseCode){
  console.log(`Response: ${responseCode}`)
}

function outputNoResponse(url){
  console.log(`No Connection to: ${url}`)
}

function logConnectionRestored(){
  logInfo(`Connection Restored:        ${new Date().toString()} \n\n`);
}

function logConnectionLost(){
  logInfo(`Connection timed out:       ${new Date().toString()} \n`);
}

function logInfo(falureValue){
  fs.appendFile(logFile, falureValue, error => {
    if(error) throw error
  })
}

// import { setTimeout } from 'timers';

const fetch = require('node-fetch');
const fs = require('fs')
const logFile = "./netLog.txt"
let isLogged = false;
const url = "https://www.google.com/"

// initializeLogFile();
ping(url, 1000)

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
      console.log(response.status);
    })
    .catch(error => {
      console.log("ERROR");
      console.log(error);
    })
}

function promiseTimeout(ms){
  return new Promise((resolve, reject) => {
    setTimeout(reject, ms, "TimedOut")
  })
}

function logInfo(falureValue){
  fs.appendFile(logFile, falureValue, error => {
    if(error) throw error
  })
}

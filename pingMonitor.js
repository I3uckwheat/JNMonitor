// import { setTimeout } from 'timers';

const fetch = require('node-fetch');
const fs = require('fs')
const logFile = "./netLog.txt"
let isLogged = false;
const url = "https://www.google.com/"

// initializeLogFile();
ping(url)

/****************************************************************/

function initializeLogFile(){
  fs.appendFile(logFile,`-----------------------------\nStarted Logging: ${new Date().toString()} \n`, error => {
    if (error) throw error;
    console.log("Logging Started");
  });
}

function ping(url){
  Promise.race([checkURL(url), rejectTime(1000)])
    .then(response => {
      console.log("success");
      console.log(response);
    })
    .catch(error => {
      console.log("ERROR");
      console.log(error);
    })
}

function rejectTime(ms){
  return new Promise((resolve, reject) => {
    setTimeout(reject, ms, "TimedOut")
  })
}

function checkURL(url){
  return fetch(url)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}

function logInfo(falureValue){
  fs.appendFile(logFile, falureValue, error => {
    if(error) throw error
  })
}

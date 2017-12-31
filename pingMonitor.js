const fetch = require('node-fetch');
const fs = require('fs')
let isLogged = false;

initializeLogFile();

setInterval(() => ping("https://www.google.com"), 1000)

/****************************************************************/

function initialize(){
  if(!logFileExists){
    console.log("Create Log File")
  }
}

function ping(url){
  fetch(url)
  .then(request => {
    if(isLogged){
      logInfo(`Back Up At: ${Date.now()}\n`)
      isLogged = !isLogged;
    }
    console.log("Response: OK")
  })
  .catch(error => {
    if(!isLogged){
      logInfo(`DOWN At: ${Date.now()}`);
      isLogged = true;
    }
    console.log("NetworkDown");
  });
}

function logInfo(falureValue){
  console.log(falureValue)
}

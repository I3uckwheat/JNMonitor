const fetch = require('node-fetch');
const fs = require('fs')
let isLogged = false;

function ping(){
  fetch("https://www.google.com/")
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


setInterval(ping, 1000)

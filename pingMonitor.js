var fetch = require('node-fetch');

function ping(){
  fetch("https://www.google.com/")
  .then(request => {
    console.log("Ping OK")
  })
  .catch(error => console.log("ERROR"));
}

setInterval(ping, 1000)

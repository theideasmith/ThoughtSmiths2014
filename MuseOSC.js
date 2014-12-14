var http = require('http');

http.get('127.0.0.1:5000',function(response){
  response.on('data', console.log);
  response.on('error', console.error);
});



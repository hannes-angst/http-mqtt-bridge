const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://127.0.0.1');

client.on('connect', function() { // When connected
        console.log("MQTT connected.");
});


// Load the http module to create an http server.
var http = require('http');

var server = http.createServer(function (req, res) {
   if (req.method == 'POST') {
        console.log("POST");
        var body = '';
        req.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });
        req.on('end', function () {
            console.log("url:  " + req.url);
            console.log("Body: " + body);
            client.publish(req.url, body);
        });
        res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});
        res.end('post received');
    }
  else
  {
     response.writeHead(404, {"Content-Type": "text/plain", 'Access-Control-Allow-Origin': '*'});
     response.end("NOT FOUND\n");
  }
});

server.listen(1234);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:1234/");



// Create web server
var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');

var server = http.createServer(function(request, response) {
    console.log('Request: ' + request.url);
    var urlParts = url.parse(request.url);
    var fullPath = __dirname + urlParts.pathname;
    var content = '';

    fs.readFile(fullPath, function(err, data) {
        if (err) {
            console.log('File not found: ' + fullPath);
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end('<h1>404 Not Found</h1>');
        } else {
            if (fullPath.indexOf('.js') > -1) {
                response.writeHead(200, {'Content-Type': 'text/javascript'});
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
            }
            response.end(data);
        }
    });
});

server.listen(3000);
console.log('Server running at http://localhost:3000/');
#!/usr/bin/env node
import app = require('../server');
import http = require('http');
import https = require("https");
import path = require("path");
import fs = require("fs");

var server = http.createServer(app);

server.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express angular app is listening on port:' + port);
});


//https
var options = {
    key: fs.readFileSync('./static/httpAuth/214497232540679.key'),
    cert: fs.readFileSync('./static/httpAuth/214497232540679.pem')
    // key: fs.readFileSync('../../static/httpAuth/214497232540679.key'),
    // cert: fs.readFileSync('../../static/httpAuth/214497232540679.pem')
}

https.createServer(options, app).listen(443);
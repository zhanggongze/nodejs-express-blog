#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require("../server");
var http = require("http");
var https = require("https");
var fs = require("fs");
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
};
https.createServer(options, app).listen(443);

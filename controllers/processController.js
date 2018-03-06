// var Book = require('../models/book');
var information = require('../model/myjsonfile.json')

exports.index = function(req, res) {
    res.send(information);
};

exports.casper = function(req, res) {
    var exec = require('child_process').exec;
    var fs = require('fs');
    var shellescape = require('shell-escape');

    var creds = JSON.stringify(req.query)

    var args = [
        'casperjs',
        'casper.js',
        creds
    ];

    var cmd = shellescape(args);

    exec(cmd, function (error, stdout) {
        if(error) console.log(error);
        res.send(stdout)
        // res.send(JSON.parse(stdout));
    });
};
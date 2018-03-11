var exec = require('child_process').exec;
var fs = require('fs');
var shellescape = require('shell-escape');

// var creds = JSON.stringify(req.query)
// console.log("creds", creds)
var args = [
  'node',
  'test.js'//,
  //creds
];

var cmd = shellescape(args);

exec(cmd, function (error, stdout) {
  if (error) console.log(error);
  console.log(stdout)
});
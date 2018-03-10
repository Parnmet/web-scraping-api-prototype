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
        if (stdout[0] == '{'){
            res.send(JSON.parse(stdout))
        }
        else {
            const cheerio = require('cheerio')
            const cheerioTableparser = require('cheerio-tableparser');
            var $ = cheerio.load(stdout)
            cheerioTableparser($)
            var data = $('table.table').parsetable(true, true, true)
            console.log(data)
            data = prepareData(data)
            data = fillEmptyCell(data)
            data = convertRowToColumn(data)
            delete data[0]

            const csvToJson = () => {
                return new Promise((resolve, reject) => {
                    const csv = require('csvtojson')
                    csv()
                        .on('json', (jsonObj, rowIndex) => {
                            console.log(jsonObj)
                            resolve(jsonObj)
                            //jsonObj=> {header1:cell1,header2:cell2}
                            //rowIndex=> number
                        })
                })
            }
            csvToJson().then((json) => res.send(data))
            // res.send(data)
        }
    });
};

function prepareData(data){
    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data[0].length; j++) {
                if (data[0][j] != "" && data[i][j] == "") {
                    data[i][j] = "-"
                }
        }
    }
    return data
}

function convertRowToColumn(data){
    var data_temp = []
    for (i = 0; i < data[0].length; i++) {
        data_temp[i] = []
        for (j = 0; j < data.length; j++) {
            data_temp[i][j] = data[j][i]
        }
    }
    return data_temp
}

function fillEmptyCell(data) {
    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data[0].length; j++) {
                if (data[i][j + 1] == "") {
                    data[i][j + 1] = data[i][j]
                }
        }
    }
    return data
}
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser');
const fs = require('fs');
var filePath = 'html_result_table/test.html' 
$ = cheerio.load(fs.readFileSync(filePath));
// cheerioTableparser($);
// //For html file.
// var data = $('table.table').parsetable(true, true, true);
// console.log(data)

cheerioTableparser($);
//For html file.
var data = $('table.table').parsetable(true, true, true);

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

data = prepareData(data)
data = fillEmptyCell(data)
data = convertRowToColumn(data)


var csv = require('fast-csv')
var ws = fs.createWriteStream('my2.csv')
csv.write(data, {
    headers: true
}).pipe(ws)

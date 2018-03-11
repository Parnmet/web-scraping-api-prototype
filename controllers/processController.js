// var Book = require('../models/book');
var information = require('../model/myjsonfile.json')
var serviceCasperAutomation = require('../services/callCasperAndScrapeResult')
var serviceValidateJson = require('../services/validateJson')

exports.index = function(req, res) {
    res.send(information);
};

exports.search = function(req, res) {
    const getCsvResult = () => {
        return new Promise((resolve, reject) => {
            serviceCasperAutomation.casperAutomation(req, res, resolve)
        })
    }
    getCsvResult().then((csv) => {
        var string_csv = csv.join("\n")
        var csv = require("csvtojson");
        csv()
            .fromString(string_csv)
            .on("end_parsed", function (jsonArrayObj) { //when parse finished, result will be emitted here.
                // console.log(jsonArrayObj);
                serviceValidateJson.validateJson(jsonArrayObj, res)
            })
    })
};
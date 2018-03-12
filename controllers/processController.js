// var Book = require('../models/book');
var informationForAPI = require('../model/informationForAPI.json')
var serviceCallCasperAndScrapeResult = require('../services/callCasperAndScrapeResult')
var serviceValidateJson = require('../services/validateJson')

exports.index = function(req, res) {
    res.send(informationForAPI);
};

exports.search = function(req, res) {
    //Get result after page automation as a HTML table
    const getCsvResult = () => {
        return new Promise((resolve, reject) => {
            serviceCallCasperAndScrapeResult.casperAutomation(req, res, resolve)
        })
    }
    //Validate json
    getCsvResult().then((csv) => {
        var string_csv = csv.join("\n")
        var csv = require("csvtojson");
        csv()
            .fromString(string_csv)
            .on("end_parsed", function (jsonArrayObj) { 
                // console.log(jsonArrayObj);
                serviceValidateJson.validateJson(jsonArrayObj, res)
            })
            .on("error", (err) => {
                console.log(err)
                res.send({"msg":"Error occured"})
            })
    })
};
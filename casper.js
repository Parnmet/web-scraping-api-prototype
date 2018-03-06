var casper = require('casper').create();
var params = require('./model/myjsonfile.json')

const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser');

var creds = JSON.parse(casper.cli.args)
var host = params.url
casper.start(host, function () {
    this.waitForSelector('input[name="start"]');
});

// Fill data
casper.then(function () {
    this.fill('form', creds)
});

casper.then(function() {
    if(creds.hasOwnProperty('submit')){
        this.click('button:[value="' + creds.submit + '"]')
    }
    // Default submit
    else {
        this.click('button[value=sum]')
    }
})

casper.waitForSelector('h4.text-center', function(){
    var response = {}
    var text = this.fetchText('h4.text-center')
    if (this.exists('.table-responsive')) {
        //Implementing
        
        // console.log(require('utils').dump(this.getPageContent()))
        var $ = cheerio.load(this.getPageContent())
        // console.log(this.getPageContent())

        cheerioTableparser($)
        var data = $('table.table').parsetable(true, true, true)
        // console.log(data)
        var result = "Success"
    } 
    else {
        var result = this.fetchText('h3.text-center')
    }
    response.text = text
    response.result = result
    console.log(JSON.stringify(response))
    casper.capture('navigation2.png');
})

casper.run();

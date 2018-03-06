var links = [];
// var casper = require('casper').create();
var raw_value = require('./myjsonfile.json')
var spooky = require('spooky');

var spooky = new Spooky({
    child: {
        transport: 'http'
    },
    casper: {
        logLevel: 'debug',
        verbose: true
    }
}, function (err) {
    if (err) {
        e = new Error('Failed to initialize SpookyJS');
        e.details = err;
        throw e;
    }

    var host = 'http://organic.doa.go.th/login/report_search'
    //fill(String selector, Object values[, Boolean submit])
    spooky.start(host, function () {
        // Wait for the page to be loaded
        getValue()
        this.waitForSelector('input[name="start"]');
    });

    //Get detail from json then fill values
    spooky.then(function () {
        for (i = 0; i < position_list.length; i++) {
            var query_object = {}
            var name = position_list[i] //start
            query_object[name] = value_list[i] //{ start: '05-05-0505' }
            this.fill('form', query_object);
        }
    });

    spooky.then(function () {
        var submit_name = "search"
        var submit_value = "sum"
        this.click('button[value=single]')
    })

    spooky.waitForSelector('h4.text-center', function () {
        this.echo(this.fetchText('h4.text-center'))
        this.echo(this.fetchText('h3.text-center'))
        // console.log(this.getElementInfo('h4.text-center').text)
        // console.log(this.getElementInfo('h3.text-center').text)
        spooky.capture('navigation2.png');
    })

    spooky.run();
});

spooky.on('error', function (e, stack) {
console.error(e);

if (stack) {
    console.log(stack);
}
});

/*
// Uncomment this block to see all of the things Casper has to say.
// There are a lot.
// He has opinions.
spooky.on('console', function (line) {
console.log(line);
});
*/

spooky.on('hello', function (greeting) {
console.log(greeting);
});

spooky.on('log', function (log) {
if (log.space === 'remote') {
    console.log(log.message.replace(/ \- .*/, ''));
}
});

var type_list = []
var position_list = []
var value_list = []
function getValue() {
    raw_value.query_string.forEach(function(element) {
        type_list.push(element.type)
        position_list.push(element.name)
        if (element.hasOwnProperty('option')) {
            if (element.option[1] == undefined) {
                value_list.push(element.option[0].value)
            }
            else {
                value_list.push(element.option[1].value)
            }
        }
        else {
            value_list.push(element.value)
        }
    });
}




exports.casperAutomation = (req, res, resolve) => {
    var exec = require('child_process').exec;
    var fs = require('fs');
    var shellescape = require('shell-escape');

    var creds = JSON.stringify(req.query)
    console.log("creds", creds)
    var args = [
        'casperjs',
        './services/casperAutomation.js',
        creds
    ];

    var cmd = shellescape(args);

    exec(cmd, function (error, stdout) {
        if (error) console.log(error);
        if (stdout[0] == '{') {
            res.send(JSON.parse(stdout))
        }
        else {
            const cheerio = require('cheerio')
            const cheerioTableparser = require('cheerio-tableparser');
            var $ = cheerio.load(stdout)
            cheerioTableparser($)
            var data = $('table.table').parsetable(true, true, true)
            data = prepareData(data)
            data = fillEmptyCell(data)
            data = convertRowToColumn(data)
            data.splice(0,1)
            data.splice(0,"ผู้ขอการรับรอง,ที่อยู่บ้าน/สำนักงาน.เลขที่,ที่อยู่บ้าน/สำนักงาน.หมู่,ที่อยู่บ้าน/สำนักงาน.ตำบล,ที่อยู่บ้าน/สำนักงาน.อำเภอ,ที่อยู่บ้าน/สำนักงาน.จังหวัด,ที่ตั้งแปลง.เลขที่,ที่ตั้งแปลง.หมู่,ที่ตั้งแปลง.ตำบล,ที่ตั้งแปลง.อำเภอ,ที่ตั้งแปลง.จังหวัด,โทรศัพท์,ชนิดพืช,พื่นที่ (ไร่),หน่วยงาน,สถานะ,รหัสแปลง")
            resolve(data)
        }
    });
}

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
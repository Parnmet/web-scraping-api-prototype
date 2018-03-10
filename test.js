/* set up XMLHttpRequest */
var XLSX = require('xlsx')
// var url = require('./my2.csv');
var fs = require('fs')
var csv = require('fast-csv')
a = [
    [
        "ผู้ขอการรับรอง",
        "เลขที่",
        "หมู่",
        "ตำบล",
        "อำเภอ",
        "จังหวัด",
        "เลขที่",
        "หมู่",
        "ตำบล",
        "อำเภอ",
        "จังหวัด",
        "โทรศัพท์",
        "ชนิดพืช",
        "พื่นที่ (ไร่)",
        "หน่วยงาน",
        "สถานะ",
        "รหัสแปลง"
    ]
    [
        "นางแดง เนตรแสงสี",
        "22",
        "5",
        "ชาติตระการ",
        "ชาติตระการ",
        "พิษณุโลก",
        "-",
        "5",
        "ชาติตระการ",
        "ชาติตระการ",
        "พิษณุโลก",
        "-",
        "กล้วยน้ำว้า",
        "1.00",
        "เขต 2",
        "ได้รับการรับรอง",
        "650302-00004"
    ]
    [
        "นางแดง เนตรแสงสี",
        "22",
        "5",
        "ชาติตระการ",
        "ชาติตระการ",
        "พิษณุโลก",
        "-",
        "5",
        "ชาติตระการ",
        "ชาติตระการ",
        "พิษณุโลก",
        "-",
        "ผักกวางตุ้ง",
        "0.25",
        "เขต 2",
        "ได้รับการรับรอง",
        "650302-00004"
    ]
    [
        "นางแดง เนตรแสงสี",
        "22",
        "5",
        "ชาติตระการ",
        "ชาติตระการ",
        "พิษณุโลก",
        "-",
        "5",
        "ชาติตระการ",
        "ชาติตระการ",
        "พิษณุโลก",
        "-",
        "ผักกาดเขียวปลี",
        "0.25",
        "เขต 2",
        "ได้รับการรับรอง",
        "650302-00004"
    ]
    [
        "รวม",
        "รวม",
        "รวม",
        "รวม",
        "รวม",
        "รวม",
        "รวม",
        "รวม",
        "รวม",
        "รวม",
        "รวม",
        "รวม",
        "รวม",
        "1.50",
        "-",
        "-",
        "-"
    ]
]




/* convert data to binary string */
// var data = new Uint8Array(arraybuffer);
// var arr = new Array();
// for(var i = 0; i != data.length; ++i) a[i] = String.fromCharCode(data[i]);
// var bstr = a.join("");

/* Call XLSX */
var workbook = XLSX.read(a, {type:"string"});

/* DO SOMETHING WITH workbook HERE */
var first_sheet_name = workbook.SheetNames[0];
/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];

console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));

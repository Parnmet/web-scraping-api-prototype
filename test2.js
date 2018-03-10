a = [["ผู้ขอการรับรอง","เลขที่","หมู่","ตำบล","อำเภอ","จังหวัด","เลขที่","หมู่","ตำบล","อำเภอ","จังหวัด","โทรศัพท์","ชนิดพืช","พื่นที่ (ไร่)","หน่วยงาน","สถานะ","รหัสแปลง"],
["นางสาวจุฑารัตน์ โรจน์บัณฑิต","19/4","6","บึงบา","หนองเสือ","ปทุมธานี","181","9","ขนงพระ","ปากช่อง","นครราชสีมา","0628284936","ถั่วลิสง","0.30","เขต 4","ผ่านการบันทึกผลตรวจ","302107-00004"]]


// require csvtojson
var csv = require("csvtojson");

// Convert a csv file with csvtojson
csv()
  .fromFile("./my2.csv")
  .on("end_parsed",function(jsonArrayObj){ //when parse finished, result will be emitted here.
     console.log(jsonArrayObj); 
   })
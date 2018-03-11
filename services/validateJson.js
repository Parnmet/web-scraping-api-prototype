exports.validateJson = (json, res) => {
    let temp_index = 0
    let temp_list = []
    let temp_total = 0
    let result_list = []
    json.forEach((element, index) => {
        let temp_object = {}
        if (!temp_list.length) {
            temp_index = index
            temp_object['ชนิดพืช'] = element['ชนิดพืช']
            temp_object['พื่นที่ (ไร่)'] = element['พื่นที่ (ไร่)']
            delete json[index]['ชนิดพืช']
            delete json[index]['พื่นที่ (ไร่)']
            temp_list.push(temp_object)
        }
        else if (element['ผู้ขอการรับรอง'] != "รวม") {
            temp_object['ชนิดพืช'] = element['ชนิดพืช']
            temp_object['พื้นที่ (ไร่)'] = element['พื่นที่ (ไร่)']
            temp_list.push(temp_object)
        }
        else {
            json[temp_index]['ข้อมูลแปลง'] = temp_list
            json[temp_index]['รวมพื้นที่ (ไร่)'] = element['พื่นที่ (ไร่)']
            result_list.push(json[temp_index])
            temp_list = []
            temp_index = 0
            temp_total = 0
        }
    })
    json = []
    // return result_list
    res.send(result_list)
}
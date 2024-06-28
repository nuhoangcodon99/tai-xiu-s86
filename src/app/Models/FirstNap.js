let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
	uid:    {type: String, index: true},              // Người Nạp Đầu
    name:   {type: String, default: null},            // tên
    gate:   {type: String, default: null},            // Cổng nạp Momo, Banking, ViettelPay
	red:    {type: Number, default: 0},               // Giá trị Red đã nhận (tiền nạp)
    taget:  {type: Number, default: 0},               // hạn mức chi tiêu cần đạt (tiền chơi/ tiền hạn mức)
    fund:   {type: Number, default: 0},               // Tiền quỹ x2 nạp đầu
    date:   {type: Date,   default: new Date()},      // Ngày tạo
    todate: {type: Date},                             // Ngày hết hạn
    status: {type: Number, default: 0}                // trạng thái nhận thưởng
});

Schema.index({uid:1, type:1}, {background: true});
module.exports = mongoose.model('FirstNap', Schema);
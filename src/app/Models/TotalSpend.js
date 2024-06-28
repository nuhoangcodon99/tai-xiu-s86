let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
	uid:    {type: String, index: true},              // Người Chơi
    name:   {type: String, default: null},            // tên
	red:    {type: Number, default: 0},               // Giá trị Red đã tiêu (tiền chơi)
    date:   {type: Date,   default: new Date()}       // Ngày tạo
});

Schema.index({uid:1, type:1}, {background: true});
module.exports = mongoose.model('TotalSpend', Schema);
let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    code: { type: String, unique: true }, // Mã Gift code
    red: { type: Number, default: 0 }, // Giá trị tiền
    quality: { type: Number, default: 1 }, // Số lượng giới hạn sử dụng
    used: { type: Number, default: 0 }, // Số lượng đã sử dụng
    status: { type: Number, default: '1' }, // trạng thái có thể sử dụng
    date: { type: Date, default: new Date() }, // Ngày tạo
    todate: { type: Date }, // Ngày hết hạn (Thẻ gift có giá trị đến hết 24H trong ngày hết hạn)
});

Schema.index({ code: 1 }, { background: true });
module.exports = mongoose.model('GiftCodeOne', Schema);
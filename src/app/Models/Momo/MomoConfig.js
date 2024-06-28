let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    prefix: { type: String, default: 'momo' }, // key xác định
    name: { type: String, required: true }, // tên của ví
    phone: { type: String, required: true }, // số điện thoại
    date: { type: Date, default: new Date() } // Ngày tạo
});

Schema.index({ uid: 1, type: 1 }, { background: true });
module.exports = mongoose.model('MomoConfig', Schema);
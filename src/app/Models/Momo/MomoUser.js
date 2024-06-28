let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    uid: { type: String, required: true }, // Người Chơi
    name: { type: String, required: true }, // tên
    bet: { type: Number, default: 0 }, // tiền cược
    red: { type: Number, default: 0 }, // tiền thắng
    date: { type: Date, default: new Date() } // Ngày tạo
});

Schema.index({ uid: 1, type: 1 }, { background: true });
module.exports = mongoose.model('MomoUser', Schema);
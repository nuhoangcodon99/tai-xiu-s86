let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    code: { type: String, unique: true }, // Mã Gift code
    uid: { type: String, index: true }, // Người Nạp gift code
    date: { type: Date, default: new Date() }, // Ngày tạo
});

Schema.index({ code: 1 }, { background: true });
module.exports = mongoose.model('UsedGiftCodeOne', Schema);
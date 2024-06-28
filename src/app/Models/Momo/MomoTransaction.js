let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    uid: { type: String, required: true }, // Người Chơi
    name: { type: String, required: true }, // tên
    transID: { type: Number, required: true }, // momo transaction ID
    game: { type: String, required: true }, // prefix trò chơi
    bet: { type: Number, default: 0 }, // tiền cược
    content: { type: String, required: true }, // nội dung game
    thanhtoan: { type: Boolean, default: false }, // trạng thái xử lý
    date: { type: Date, default: new Date() } // Ngày tạo
});

Schema.index({ uid: 1, type: 1 }, { background: true });
module.exports = mongoose.model('MomoTransaction', Schema);
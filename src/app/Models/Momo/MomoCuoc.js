let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    uid: { type: String, required: true }, // Người Chơi
    name: { type: String, required: true }, // tên
    bot: { type: Boolean, default: false }, // là bot hay người
    transID: { type: Number, required: true }, // momo transaction ID
    game: { type: String, required: true }, // prefix trò chơi
    content: { type: String, required: true }, // nội dung game
    bet: { type: Number, default: 0 }, // tiền cược
    win: { type: Boolean, default: false }, // thắng
    red: { type: Number, default: 0 }, // tiền thắng
    description: { type: String, required: true }, // mô tả
    date: { type: Date, default: new Date() } // Ngày tạo
});

Schema.index({ uid: 1, type: 1 }, { background: true });
module.exports = mongoose.model('MomoCuoc', Schema);
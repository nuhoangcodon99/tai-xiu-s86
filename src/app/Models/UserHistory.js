let AutoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
let mongoose = require('mongoose');
let moment = require('moment-timezone');
moment.tz.setDefault("Asia/Ho_Chi_Minh");


let Schema = new mongoose.Schema({
    uid: { type: String, required: true }, // id
    name: { type: String, required: true }, // Tên nhân vật
    action: { type: String, required: true }, // hành động
    transType: { type: String, required: true }, // kiểu biến động + hoặc - tiền
    red: { type: Number, default: 0 }, // số tiền
    balance: { type: Number, required: true }, // số dư sau giao dịch,
    description: { type: String }, // mô tả giao dịch
    date: { type: String, default: moment().format("DD/MM/YYYY - HH:mm:ss") }, // Ngày tạo
});

Schema.plugin(AutoIncrement.plugin, { modelName: 'UserHistory', field: 'id' });

module.exports = mongoose.model('UserHistory', Schema);
let AutoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
let mongoose = require('mongoose');
let moment = require('moment-timezone');
moment.tz.setDefault("Asia/Ho_Chi_Minh");


let Schema = new mongoose.Schema({
    name: { type: String, required: true }, // Tên nhân vật
    action: { type: String, required: true }, // hành động
    description: { type: String }, // mô tả giao dịch
    date: { type: String, default: moment().format("DD/MM/YYYY - HH:mm:ss") }, // Ngày tạo
});

Schema.plugin(AutoIncrement.plugin, { modelName: 'AdminHistory', field: 'id' });

module.exports = mongoose.model('AdminHistory', Schema);
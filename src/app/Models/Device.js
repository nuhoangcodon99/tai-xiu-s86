let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DeviceSchema = new Schema({
    uid: { type: String, required: true, unique: true }, // ID Người chơi
    ip: { type: String, default: null },
    isbrowser: { type: Boolean, default: true },
    os: { type: String, default: null },
});

module.exports = mongoose.model('Device', DeviceSchema);
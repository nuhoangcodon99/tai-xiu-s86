let mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let Schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    vip: { type: mongoose.Schema.Types.Long, default: 0, index: true },
});
module.exports = mongoose.model('TopVip', Schema);
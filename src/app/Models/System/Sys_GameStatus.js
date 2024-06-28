let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    key: { type: String, require: true }, // key
    value: { type: Boolean, require: false }, // value
});

module.exports = mongoose.model('Sys_gamestatus', Schema);
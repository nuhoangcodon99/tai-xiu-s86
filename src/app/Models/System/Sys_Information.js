let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    key: { type: String, require: true }, // key
    value: { type: String, require: false }, // value
});

module.exports = mongoose.model('Sys_information', Schema);
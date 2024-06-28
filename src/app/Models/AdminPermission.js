let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    username: { type: String, required: true },
    permission: { type: String, require: true },
    status: { type: Boolean, require: true, default: false },
});

module.exports = mongoose.model('Admin_Permission', Schema);
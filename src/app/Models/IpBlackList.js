let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let IpBlackListSchema = new Schema({
    ip: { type: String, default: null },
});

module.exports = mongoose.model('Ip_BlackList', IpBlackListSchema);
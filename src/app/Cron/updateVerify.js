let UserInfo = require('../Models/UserInfo');
let Telegram = require('../Models/Telegram');
module.exports = function() {
    UserInfo.updateMany({}, { '$set': { 'veryphone': true, 'veryold': true } }).exec();
    Telegram.deleteMany({}).exec();
}
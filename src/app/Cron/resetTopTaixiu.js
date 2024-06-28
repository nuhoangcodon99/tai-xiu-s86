let TX_User = require('../Models/TaiXiu_user');

module.exports = function() {
    try {
    TX_User.updateMany({}, { '$set': { 'tWinRed': 0, 'tLostRed': 0, 'totall': 0, 'tRedPlay': 0 } }).exec(function(err, result) {});
    } catch(e) {
        console.log(e);
    }
}
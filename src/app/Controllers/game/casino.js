var getBalance = require('./casino/getBalance');
var getPlayData = require('./casino/getPlayData');
var chuyenquy = require('./casino/chuyenquy');

module.exports = function(client, data) {
    if (!!data.getBalance) {
        getBalance(client, data.getBalance);
    }
    if (!!data.getPlayData) {
        getPlayData(client, data.getPlayData);
    }
    if (!!data.chuyenquy) {
        chuyenquy(client, data.chuyenquy);
    }
};
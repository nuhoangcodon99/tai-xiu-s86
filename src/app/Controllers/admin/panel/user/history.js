var chuyen = require('./history/chuyen');
var taixiu = require('./history/taixiu');
var biendong = require('./history/biendong');

module.exports = function(client, data) {
    if (!!data.chuyen) {
        chuyen(client, data.chuyen);
    }
    if (!!data.taixiu) {
        taixiu(client, data.taixiu);
    }
    if (!!data.biendong) {
        biendong(client, data.biendong);
    }
}
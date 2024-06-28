const TXPhien = require('../../../../Models/TaiXiu_phien');

module.exports = function(client) {
    try {
        if (client.redT.hasOwnProperty("TaiXiu_time")) {
            if (typeof(client.redT.TaiXiu_time) !== 'undefined') {
                if (client.redT.TaiXiu_time) {
                    TXPhien.findOne({}, 'id', { sort: { 'id': -1 } }, function(err, last) {
                        if (last !== null) {
                            client.red({ taixiu: { phien: last.id + 1, time_remain: client.redT.TaiXiu_time } });
                        }
                    });
                }
            } else {
                client.red({ notice: { title: 'LỖI', text: 'Vui lòng tải lại trang...' } });
            }
        } else {
            client.red({ notice: { title: 'LỖI', text: 'Vui lòng tải lại trang...' } });
        }
    } catch (e) {
        client.red({ notice: { title: 'LỖI', text: 'Vui lòng tải lại trang...' } });
    }
}
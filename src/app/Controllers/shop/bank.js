let list = require('./bank/list');
let rut = require('./bank/rut');
let nap = require('./bank/nap');
let request = require('./bank/request');
let get_bank_available = require('./bank/get_bank_available');

module.exports = function(client, data) {
    if (!!data.list) {
        list(client);
    }
    if (!!data.rut) {
        rut(client, data.rut);
    }
    if (!!data.nap) {
        nap(client, data.nap);
    }

    // gửi yêu cầu bank 
    if (!!data.request) {
        request(client, data.request);
    }
    // lấy danh sách bank 
    if (!!data.get_bank_available) {
        get_bank_available(client, data.get_bank_available);
    }
}
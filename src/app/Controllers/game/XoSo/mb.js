let moment = require('moment-timezone');
moment.tz.setDefault("Asia/Ho_Chi_Minh");
let lo2 = require('./mb/lo2so');
let lo21k = require('./mb/lo2so1k');
let lo3 = require('./mb/lo3so');
let lo4 = require('./mb/lo4so');
let xien2 = require('./mb/xien2');
let xien3 = require('./mb/xien3');
let xien4 = require('./mb/xien4');
let de = require('./mb/de');
let daude = require('./mb/daude');
let degiai7 = require('./mb/degiai7');
let degiai1 = require('./mb/degiai1');
let cang3 = require('./mb/cang3');
let cang4 = require('./mb/cang4');
let dau = require('./mb/dau');
let duoi = require('./mb/duoi');
let truot4 = require('./mb/truot4');
let truot8 = require('./mb/truot8');
let truot10 = require('./mb/truot10');
let kq = require('./mb/kq');
let history = require('./mb/history');

const currentHour = moment().hour();
const stopOrderHour = 18;

let isStopOrder = (client) => {
    if (currentHour >= stopOrderHour) {
        client.red({ XoSo: { notice: 'Thời gian chọn số đã kết thúc, hãy đặt lại vào ngày mai...' } });
        return true;
    } else {
        return false;
    }
}

module.exports = function(client, data) {
    if (!!data.history) {
        history(client, data.history);
    }
    if (!!data.kq) {
        kq(client, data.kq);
    }

    if (!!data.lo2) {
        if (isStopOrder(client)) return void 0;
        lo2(client, data.lo2);
    }
    if (!!data.lo21k) {
        if (isStopOrder(client)) return void 0;
        lo21k(client, data.lo21k);
    }
    if (!!data.lo3) {
        if (isStopOrder(client)) return void 0;
        lo3(client, data.lo3);
    }
    if (!!data.lo4) {
        if (isStopOrder(client)) return void 0;
        lo4(client, data.lo4);
    }
    if (!!data.xien2) {
        if (isStopOrder(client)) return void 0;
        xien2(client, data.xien2);
    }
    if (!!data.xien3) {
        if (isStopOrder(client)) return void 0;
        xien3(client, data.xien3);
    }
    if (!!data.xien4) {
        xien4(client, data.xien4);
    }
    if (!!data.de) {
        if (isStopOrder(client)) return void 0;
        de(client, data.de);
    }
    if (!!data.daude) {
        if (isStopOrder(client)) return void 0;
        daude(client, data.daude);
    }
    if (!!data.cang3) {
        if (isStopOrder(client)) return void 0;
        cang3(client, data.cang3);
    }
    if (!!data.cang4) {
        if (isStopOrder(client)) return void 0;
        cang4(client, data.cang4);
    }
    if (!!data.degiai7) {
        if (isStopOrder(client)) return void 0;
        degiai7(client, data.degiai7);
    }
    if (!!data.degiai1) {
        if (isStopOrder(client)) return void 0;
        degiai1(client, data.degiai1);
    }
    if (!!data.dau) {
        if (isStopOrder(client)) return void 0;
        dau(client, data.dau);
    }
    if (!!data.duoi) {
        if (isStopOrder(client)) return void 0;
        duoi(client, data.duoi);
    }
    if (!!data.truot4) {
        if (isStopOrder(client)) return void 0;
        truot4(client, data.truot4);
    }
    if (!!data.truot8) {
        if (isStopOrder(client)) return void 0;
        truot8(client, data.truot8);
    }
    if (!!data.truot10) {
        if (isStopOrder(client)) return void 0;
        truot10(client, data.truot10);
    }
    client = null;
    data = null;
};
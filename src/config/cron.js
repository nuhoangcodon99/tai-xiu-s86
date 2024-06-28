let moment = require('moment-timezone');
moment.tz.setDefault("Asia/Ho_Chi_Minh");
let CronJob = require('cron').CronJob;
let CronHu = require('../app/Cron/EventHu');
let XSMB = require('../app/Cron/XSMB/XSMB');
let XSMB_trathuong = require('../app/Cron/XSMB/XSMB_trathuong');
let DeleteTrash = require('../app/Cron/DeleteTrash');
let removeChat = require('../app/Cron/Tx_removeChat');
let resetTopTaixiu = require('../app/Cron/resetTopTaixiu');
let xulyGiaoDichErr = require('../app/Cron/taixiu/tralaiGiaoDichErr');

module.exports = function () {
    // new CronJob('0 0 0 * * *', function() {
    //     CronHu();
    // }, null, true, 'Asia/Ho_Chi_Minh');

    // new CronJob('* * * * *', function() {
    //     DeleteTrash();
    // }, null, true, 'Asia/Ho_Chi_Minh');
    setInterval(() => {
        XSMB();
    }, 180000); // 3 giờ cào 1 lần

    setInterval(() => {
        // nếu thời gian >= 18h thì bắt đầu trả thưởng
        if (moment().hour() >= 18) {
            XSMB_trathuong();
        }
    }, 60000);

    setInterval(() => {
        // trả thưởng giao dịch chưa được xử lý Taixiu
        xulyGiaoDichErr();
    }, 50000);

    new CronJob('59 23 * * *', function () {
        resetTopTaixiu();
    }, null, true, 'Asia/Ho_Chi_Minh');
    removeChat();
}
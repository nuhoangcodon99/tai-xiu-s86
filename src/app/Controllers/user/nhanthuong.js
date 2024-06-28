const UserInfo = require('../../Models/UserInfo');
const helper = require('../../Helpers/Helpers');

let UserHistory = require('../../Models/UserHistory');
let UserHistoryEnums = require('../../../config/userHistoryEnums');



module.exports = function(client) {
    UserInfo.findOne({ id: client.UID }, 'red name lastVip redPlay vip', function(err, user) {
        var vipHT = ((user.redPlay - user.lastVip) / 100000) >> 0; // Điểm vip Hiện Tại
        var red = 0; // Giá điểm vip

        if (vipHT >= 120000) {
            red = 120000;
        } else if (vipHT >= 50000) {
            red = 50000;
        } else if (vipHT >= 15000) {
            red = 15000;
        } else if (vipHT >= 6000) {
            red = 6000;
        } else if (vipHT >= 3000) {
            red = 3000;
        } else if (vipHT >= 1000) {
            red = 1000;
        } else if (vipHT >= 500) {
            red = 500;
        } else if (vipHT >= 100) {
            red = 100;
        }

        var tien = red; // Tiền thưởng lastVip
        if (tien > 0) {
            user.red = user.red * 1 + tien; // cập nhật red
            user.vip += vipHT; // vip tích lũy
            user.lastVip = user.redPlay; // Nhận thưởng lần cuối
            user.save();


            UserHistory.create({
                uid: client.UID,
                name: user.name,
                action: UserHistoryEnums.NHAN_TIEN_VIP,
                transType: UserHistoryEnums.TRANS_PLUS,
                red: tien,
                balance: user.red * 1,
                description: 'Nhận thưởng Vip'
            });

            client.red({ profile: { level: { level: 1, vipNext: 100, vipPre: 0, vipTL: user.vip + vipHT, vipHT: 0 } }, notice: { text: 'Bạn nhận được ' + helper.numberWithCommas(tien) + '  ', title: 'THÀNH CÔNG' }, user: { red: user.red } });
        } else {
            client.red({ notice: { text: 'Bạn chưa đủ cấp VIP để đổi thưởng...', title: 'THẤT BẠI' } });
        }
    });
}
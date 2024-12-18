let UserInfo = require('../Models/UserInfo');
let OTP = require('../Models/OTP');
let Phone = require('../Models/Phone');
let telegram = require('../Models/Telegram');

function createOTP(client) {
    Phone.findOne({ 'uid': client.UID }, function (err3, check) {
        if (check) {
            OTP.findOne({ 'uid': client.UID, 'phone': check.phone }, {}, { sort: { '_id': -1 } }, function (err1, data) {
                if (!data || ((new Date() - Date.parse(data.date)) / 1000) > 180 || data.active) {
                    // Tạo mã OTP mới
                    UserInfo.findOne({ 'id': client.UID }, 'red', function (err2, user) {
                        if (user) {
                            let otp = (Math.random() * (9999 - 1000 + 1) + 1000) >> 0; // OTP từ 1000 đến 9999
                            telegram.findOne({ 'phone': check.phone }, 'form', function (err3, teleCheck) {
                                if (!!teleCheck) {
                                    OTP.create({ 'uid': client.UID, 'phone': check.phone, 'code': otp, 'date': new Date() });
                                    client.red({ notice: { title: 'THÔNG BÁO', text: 'Mã OTP đã được gửi tới Telegram của bạn.' } });
                                    client.redT.telegram.sendMessage(teleCheck.form, '*OTP*:  ' + otp + '', { parse_mode: 'markdown', reply_markup: { remove_keyboard: true } }).then((resp) => { }).catch((error) => { });
                                } else {
                                    client.red({ notice: { title: 'THẤT BẠI', text: 'Bạn cần xác thực Telegram để lấy OTP.' } });
                                }
                            });
                        }
                    });
                } else {
                    client.red({ notice: { title: 'OTP', text: 'Vui lòng kiểm tra hòm thư đến trong Telegram.!' } });
                }
            });
        } else {
            client.red({ notice: { title: 'THÔNG BÁO', text: `Bạn cần kích hoạt số điện thoại\n để sử dụng chức năng này!`, button: { text: 'KÍCH HOẠT', type: 'reg_otp' } } });
        }
    });
}

module.exports = function (client) {
    createOTP(client);
}
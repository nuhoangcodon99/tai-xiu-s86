let telegram = require('../../Models/Telegram');
let Phone = require('../../Models/Phone');
let UserInfo = require('../../Models/UserInfo');
let helpers = require('../../Helpers/Helpers');

module.exports = function (redT, id, contact) {
    let phoneCrack = helpers.phoneCrack(contact);
    if (phoneCrack) {
        Phone.findOne({ 'phone': phoneCrack.phone }, 'uid region phone', function (err, check1) {
            if (check1) {
                try {
                    telegram.create({ 'form': id, 'phone': phoneCrack.phone }, function (err, cP) {
                        phoneCrack = null;
                        if (!!cP) {
                            UserInfo.findOneAndUpdate({ id: check1.uid }, { $set: { veryphone: true, veryold: true }, $inc: { red: 0 } }).exec(function (err, info) {
                                if (!!info) {
                                    redT.telegram.sendMessage(id,
                                        '❗️ *XÁC THỰC TÀI KHOẢN THÀNH CÔNG*\nChào mừng thành viên mới: *' + info.name + '*,\n' +
                                        'chúc bạn chơi game vui vẻ...\n' +
                                        '🚀 * HƯỚNG DẪN SỬ DỤNG BOT *\n' +
                                        'Bạn vui lòng nhập các lệnh dưới tương ứng với chức năng của bot:' + '\n' +
                                        '*OTP*: Để lấy mã OTP miễn phí.' + '\n' +
                                        '*GiftCode*:  Để nhận ngay GiftCode miễn phí.', { parse_mode: 'markdown', reply_markup: { remove_keyboard: true } }).then((resp) => { }).catch((error) => { });
                                    if (void 0 !== redT.users[check1.uid]) {
                                        redT.users[check1.uid].forEach(function (client) {
                                            client.red({ notice: { title: 'THÀNH CÔNG', text: 'Xác thực thành công.!\nChúc các bạn may mắn tại WinVip.Club...' }, user: { red: info.red * 1 + 0, phone: helpers.cutPhone(check1.region + check1.phone), veryphone: true } });
                                        });
                                    }
                                    redT = null;
                                    id = null;
                                }
                            });
                        } else {
                            redT.telegram.sendMessage(id, '_Thao tác thất bại_', { parse_mode: 'markdown', reply_markup: { remove_keyboard: true } }).then((resp) => { }).catch((error) => { });
                            redT = null;
                            id = null;
                        }
                    });
                } catch (error) {
                    redT.telegram.sendMessage(id, '_Thao tác thất bại_', { parse_mode: 'markdown', reply_markup: { remove_keyboard: true } }).then((resp) => { }).catch((error) => { });
                    redT = null;
                    id = null;
                    phoneCrack = null;
                }
            } else {
                redT.telegram.sendMessage(id, '*Số điện thoại của bạn chưa được đăng ký*.\nVui lòng đăng ký tài khoản và nhập số điện thoại này vào để xác thực tại _WinVip.CLUB_', { parse_mode: 'markdown', reply_markup: { remove_keyboard: true } }).then((resp) => { }).catch((error) => { });
                redT = null;
                phoneCrack = null;
                id = null;
            }
        });
    }
}
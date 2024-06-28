let telegram = require('../../Models/Telegram');

module.exports = function (bot, id) {
    telegram.findOne({ 'form': id }, 'phone', function (err, data) {
        if (data) {
            let opts = {
                parse_mode: 'markdown',
                reply_markup: {
                    remove_keyboard: true,
                }
            };
            bot.sendMessage(id,
                '🚀 *HƯỚNG DẪN SỬ DỤNG BOT*' + '\n' +
                'Bạn vui lòng nhập các lệnh dưới tương ứng với chức năng của bot:' + '\n' +
                '*OTP*: Để lấy mã OTP miễn phí.' + '\n' +
                '*GiftCode*:  Để nhận ngay GiftCode miễn phí.', opts).then((resp) => { }).catch((error) => { });
            bot = null;
            id = null;
        } else {
            let opts = {
                parse_mode: 'markdown',
                reply_markup: {
                    keyboard: [
                        [{ text: 'CHIA SẺ SỐ ĐIỆN THOẠI', request_contact: true }],
                    ],
                    resize_keyboard: true,
                }
            };
            bot.sendMessage(id, '🔊 *Tin nhắn hệ thống:*\nĐây là lần đầu tiên bạn sử dụng BOT OTP. \nBạn vui lòng ấn *CHIA SẺ SỐ ĐIỆN THOẠI* ở bên dưới để *XÁC THỰC* và lấy mã *OTP* từ game miễn phí.', opts).then((resp) => { }).catch((error) => { });
            bot = null;
            id = null;
        }
    });
}
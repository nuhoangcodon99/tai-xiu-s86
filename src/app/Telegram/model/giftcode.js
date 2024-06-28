
let shortid = require('shortid');
let telegram = require('../../Models/Telegram');
let Phone = require('../../Models/Phone');
let GiftCode = require('../../Models/GiftCode');

module.exports = function (bot, id) {
	telegram.findOne({ 'form': id }, {}, function (err1, check) {
		if (check) {
			if (!check.gift) {
				Phone.findOne({ 'phone': check.phone }, {}, function (err2, checkPhone) {
					if (checkPhone) {
						// Gift khởi nghiệp
						let get_gift = shortid.generate();
						try {
							GiftCode.create({ 'code': get_gift, 'red': 0, 'date': new Date(), 'todate': new Date(new Date() * 1 + 86400000), 'to': checkPhone.uid }, function (err3, gift) {
								if (!!gift) {
									check.gift = true;
									check.save();
									bot.sendMessage(id, '_GiftCode miễn phí đã hết, vui Lòng liên hệ bộ phận CSKH để nhận GiftCode _', { parse_mode: 'markdown', reply_markup: { remove_keyboard: true } }).then((resp) => { }).catch((error) => { });
									check = null;
									bot = null;
									id = null;
								}
							});
						} catch (e) {
							check = null;
							bot = null;
							id = null;
						}
					} else {
						check = null;
						bot.sendMessage(id, '_Thao tác thất bại, không thể đọc số điện thoại_', { parse_mode: 'markdown', reply_markup: { remove_keyboard: true } }).then((resp) => { }).catch((error) => { });
						bot = null;
						id = null;
					}
				});
			} else {
				check = null;
				bot.sendMessage(id, '_Bạn đã nhận Giftcode Khởi nghiệp_', { parse_mode: 'markdown', reply_markup: { remove_keyboard: true } }).then((resp) => { }).catch((error) => { });
				bot = null;
				id = null;
			}
		} else {
			check = null;
			bot.sendMessage(id, '_Thao tác thất bại, không thể đọc số điện thoại_', { parse_mode: 'markdown', reply_markup: { remove_keyboard: true } }).then((resp) => { }).catch((error) => { });
			bot = null;
			id = null;
		}
	});
}

require('dotenv').config();
var MuaThe = require('../../Models/MuaThe');
var MuaThe_thenap = require('../../Models/MuaThe_card');
var UserInfo = require('../../Models/UserInfo');
var NhaMang = require('../../Models/NhaMang');
var MenhGia = require('../../Models/MenhGia');
var OTP = require('../../Models/OTP');
var Phone = require('../../Models/Phone');
var validator = require('validator');
var Helper = require('../../Helpers/Helpers');
let telegram = require('../../Helpers/Telegram');

module.exports = function(client, data) {
    if (!!data && !!data.nhamang && !!data.menhgia && !!data.soluong && !!data.otp) {
        var nhaMang = data.nhamang;
        var menhGia = data.menhgia;
        var soluong = data.soluong >> 0;
        var otp = data.otp;

        if (validator.isEmpty(nhaMang) || validator.isEmpty(menhGia) || !validator.isLength(otp, { min: 4, max: 6 }) || soluong < 1 || soluong > 3) {
            client.red({ notice: { title: 'LỖI', text: 'Mua tối thiểu 1 và tối đa 3 thẻ.' } });
        } else {
            Phone.findOne({ 'uid': client.UID }, {}, function(err, checkPhone) {
                if (checkPhone) {
                    OTP.findOne({ 'uid': client.UID, 'phone': checkPhone.phone }, {}, { sort: { '_id': -1 } }, function(err, data_otp) {
                        if (data_otp && data.otp == data_otp.code) {
                            if (((new Date() - Date.parse(data_otp.date)) / 1000) > 180 || data_otp.active) {
                                client.red({ notice: { title: 'LỖI', text: 'Mã OTP đã hết hạn.!' } });
                            } else {
                                var check1 = NhaMang.findOne({ name: nhaMang, mua: true }).exec();
                                var check2 = MenhGia.findOne({ name: menhGia, mua: true }).exec();
                                Promise.all([check1, check2])
                                    .then(values => {
                                        if (!!values[0] && !!values[1] && soluong > 0 && soluong < 4) {
                                            var totall = values[1].values * soluong;
                                            UserInfo.findOne({ id: client.UID }, function(err, check) {
                                                if (check == null || check.red <= totall) {
                                                    client.red({ notice: { title: 'MUA THẺ', text: 'Bạn không đủ tiền để mua.!!' } });
                                                } else {
                                                    if (!check.veryphone) {
                                                        client.red({ notice: { title: 'THÔNG BÁO', text: 'Tài khoản cần được xác thực!.', button: { text: 'XÁC THỰC', type: 'reg_otp' } } });
                                                    } else {
                                                        check.red -= totall;
                                                        check.save();
                                                        OTP.updateOne({ '_id': data_otp._id.toString() }, { $set: { 'active': true } }).exec();
                                                        client.red({ notice: { title: 'MUA THẺ', text: 'Yêu cầu mua thẻ thành công.!!' }, user: { red: check.red } });
                                                        MuaThe.create({ 'uid': client.UID, 'nhaMang': nhaMang, 'menhGia': menhGia, 'soLuong': soluong, 'Cost': totall, 'time': new Date() },
                                                            function(err, dataW) {
                                                                if (!!dataW) {
                                                                    var cID = dataW._id.toString();
                                                                    telegram(process.env.TELEGRAM_RECHARGE_GROUP, ` ${check.name.toUpperCase()}` + "\n" + `├ hành động : MUA THẺ` + "\n" + `├ nhà mạng: ${nhaMang}` + "\n" + `├ mệnh giá: ${menhGia}` + "\n" + `└ số lượng: ${soluong}` + "\n");
                                                                    while (soluong > 0) {
                                                                        MuaThe_thenap.create({ 'cart': cID, 'nhaMang': nhaMang, 'menhGia': menhGia });
                                                                        soluong--;
                                                                    }
                                                                }
                                                            }
                                                        );
                                                    }
                                                }
                                            });
                                        } else {
                                            client.red({ notice: { title: 'MUA THẺ', text: 'Thông tin không đúng.!!' } });
                                        }
                                    })
                            }
                        } else {
                            client.red({ notice: { title: 'LỖI', text: 'Mã OTP Không đúng.!' } });
                        }
                    });
                } else {
                    client.red({ notice: { title: 'THÔNG BÁO', text: 'Chức năng chỉ dành cho tài khoản đã kích hoạt.' } });
                }
            });
        }
    }
}
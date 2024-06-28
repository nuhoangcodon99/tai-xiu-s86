var Phone = require('../../Models/Phone');
var Otp = require('../../Models/OTP');
var telegram = require('../../Models/Telegram');
var UserInfo = require('../../Models/UserInfo');
var helper = require('../../Helpers/Helpers');


function regPhone(client, data) {
    if (!!data.phone) {
        let phone = '' + data.phone + '';
        if (!helper.checkPhoneValid(phone)) {
            client.red({ notice: { title: 'LỖI', text: 'Số điện thoại không hợp lệ.' } });
        } else {
            let phoneCrack = helper.phoneCrack(phone);
            if (phoneCrack) {
                if (phoneCrack.region == '0' || phoneCrack.region == '84') {
                    phoneCrack.region = '+84';
                }
                Phone.findOne({ 'phone': phoneCrack.phone }, function (err3, crack) {
                    if (crack) {
                        client.red({ notice: { title: 'LỖI', text: 'Số điện thoại đã tồn tại trên hệ thống.!' } });
                    } else {
                        Phone.findOne({ 'uid': client.UID }, function (err4, check) {
                            if (check) {
                                client.red({ user: { phone: helper.cutPhone(check.region + check.phone) } });
                            } else {
                                try {
                                    Phone.create({ 'uid': client.UID, 'phone': phoneCrack.phone, 'region': phoneCrack.region }, function (err, cP) {
                                        if (!!cP) {
                                            client.red({ user: { phone: helper.cutPhone(phone) } });
                                        } else {
                                            client.red({ notice: { title: 'LỖI', text: 'Số điện thoại đã tồn tại trên hệ thống.!' } });
                                        }
                                    });
                                } catch (error) {
                                    client.red({ notice: { title: 'LỖI', text: 'Số điện thoại đã tồn tại trên hệ thống.!' } });
                                }
                            }
                        });
                    }
                });
            } else {
                client.red({ notice: { title: 'THÔNG BÁO', text: 'Số điện thoại không hợp lệ.!' } });
            }
        }
    }
}

function changePhone(client, data) {
    UserInfo.findOne({ id: client.UID }, 'veryphone veryold', function (err, userInfo) {
        if (userInfo) {
            if (!userInfo.veryphone) {
                Phone.findOne({ 'uid': client.UID }, function (err3, crack) {
                    if (crack) {

                        telegram.deleteOne({ 'phone': crack.phone });
                        Otp.deleteOne({ 'uid': client.UID });
                        Phone.deleteOne({ 'uid': client.UID });

                        client.red({ changePhone: true });
                    } else {
                        client.red({ notice: { title: 'LỖI', text: 'Bạn chưa cập nhật số điện thoại.!' } });
                    }
                });
            } else {
                client.red({ notice: { title: 'LỖI', text: 'Tài khoản của bạn đã được xác thực.!' } });
            }
        } else {

        }
    });
}

module.exports = function (client, data) {
    if (!!data.regPhone) {
        regPhone(client, data.regPhone);
    }
    if (!!data.changePhone) {
        changePhone(client, data.changePhone);
    }
}
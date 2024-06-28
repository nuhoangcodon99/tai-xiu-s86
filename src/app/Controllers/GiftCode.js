let UserInfo = require('../Models/UserInfo');
let Phone = require('../Models/Phone');
let telegram = require('../Models/Telegram');
let GiftCode = require('../Models/GiftCode');
let GiftCodeOne = require('../Models/GiftCodeOne');
let UsedGiftCodeOne = require('../Models/UsedGiftCode');
let validator = require('validator');
let Helpers = require('../Helpers/Helpers');

let UserHistory = require('../Models/UserHistory');
let UserHistoryEnums = require('../../config/userHistoryEnums');

let teleMsg = require('../Helpers/Telegram');

module.exports = async function(client, data) {
    if (!!data.code) {
        let code = '' + data.code + '';
        if (!validator.isLength(code, { min: 4, max: 16 })) {
            client.red({ notice: { title: 'LỖI', text: 'GiftCode không tồn tại !!' } });
        } else {
            UserInfo.findOne({ id: client.UID }, 'gitCode gitTime name', function(errCheckG, CheckG) {
                if (!!CheckG) {
                    Phone.findOne({ uid: client.UID }, async function(errPhone, dPhone) {

                        if (!dPhone) {
                            client.red({ notice: { title: 'THẤT BẠI 1003', text: 'Tính năng chỉ dành cho các\ntài khoản đã xác minh\nsố điện thoại!!', button: { text: 'KÍCH HOẠT', type: 'reg_otp' } } });
                            return void 0;
                        }

                        const teleCheck = await telegram.findOne({ 'phone': dPhone.phone }).exec();

                        if (!teleCheck) {
                            client.red({ notice: { title: 'THẤT BẠI 1004', text: 'Tính năng chỉ dành cho các\ntài khoản đã xác minh\nsố điện thoại!!', button: { text: 'KÍCH HOẠT', type: 'reg_otp' } } });
                            return void 0;
                        }

                        let timeQuyen = false;

                        if (CheckG.gitTime === void 0) {
                            timeQuyen = true;
                        } else {
                            let dateT = new Date();
                            dateT.setHours(0, 0, 0, 0);
                            let dateH = CheckG.gitTime;
                            dateH.setHours(0, 0, 0, 0);
                            if (dateT - dateH > 86400000) {
                                timeQuyen = true;
                            }
                        }


                        if (timeQuyen) {

                            let usedTypeGift;
                            const giftOne = await GiftCodeOne.findOne({ 'code': code }, {});
                            const giftMore = await GiftCode.findOne({ 'code': code }, {});

                            if (!giftOne && !giftMore) {
                                usedTypeGift = 0;
                            } else if (giftOne && !giftMore) {
                                usedTypeGift = 1;
                            } else if (!giftOne && giftMore) {
                                usedTypeGift = 2;
                            }

                            if (usedTypeGift == 0) {
                                client.red({ notice: { title: 'THẤT BẠI', text: 'Mã Gift Code không tồn tại...!!' } });
                            } else if (usedTypeGift == 1) {

                                GiftCodeOne.findOne({ 'code': code }, {}, function(err, check) {
                                    if (!!check) {

                                        let d1 = Date.parse(new Date());
                                        let d2 = Date.parse(check.todate);
                                        if (d2 > d1) {

                                            if (check.status == 1) {

                                                if (check.used < check.quality) {

                                                    UsedGiftCodeOne.findOne({ 'uid': client.UID, 'code': code }, {}, async function(err, checkUserUsed) {
                                                        if (!checkUserUsed) {

                                                            UsedGiftCodeOne.create({
                                                                'code': code,
                                                                'uid': client.UID
                                                            }, function(errgift, createUsed) {

                                                                if (errgift) {
                                                                    client.red({ notice: { title: 'THẤT BẠI', text: 'Mã GiftCode đã được sử dụng...!!' } });
                                                                    return void 0;
                                                                }

                                                                if (!!createUsed) {

                                                                    GiftCodeOne.findOneAndUpdate({ 'code': code }, {
                                                                        $inc: {
                                                                            used: 1,
                                                                        }
                                                                    }).exec(function(err, user) {});

                                                                    UserInfo.findOne({ id: client.UID }, 'red name', function(err, user) {
                                                                        if (!!user) {
                                                                            UserHistory.create({
                                                                                uid: client.UID,
                                                                                name: user.name,
                                                                                action: UserHistoryEnums.GIFTCODE,
                                                                                transType: UserHistoryEnums.TRANS_PLUS,
                                                                                red: check.red,
                                                                                balance: user.red * 1 + check.red,
                                                                                description: 'Sử dụng GiftCode ' + code
                                                                            });
                                                                        }
                                                                    });

                                                                    UserInfo.findOneAndUpdate({ id: client.UID }, {
                                                                        $set: { gitTime: new Date() },
                                                                        $inc: { red: check.red, gitCode: 1, gitRed: check.red }
                                                                    }).exec(function(err, user) {
                                                                        client.red({ notice: { title: 'THÀNH CÔNG', text: 'Bạn nhận được: ' + (check.red > 0 ? Helpers.numberWithCommas(check.red) + ' ' : '') + (check.xu > 0 ? (check.red > 0 ? ' và ' : '') + Helpers.numberWithCommas(check.xu) + ' G' : '') }, user: { red: user.red * 1 + check.red, xu: user.xu * 1 + check.xu } });
                                                                    });

                                                                    try {
                                                                        teleMsg(process.env.TELEGRAM_GIFTCODE_GROUP, `${CheckG.name.toUpperCase()}` + "\n" + `├ vừa sử dụng mã GiftCode [ONE]: ${code}` + "\n" + `└ nhận số tiền: ${Helpers.numberWithCommas(check.red)}` + "\n");
                                                                    } catch (e) {
                                                                        console.log(e);
                                                                    }
                                                                }
                                                            });

                                                        } else {
                                                            client.red({ notice: { title: 'THẤT BẠI', text: 'Bạn đã đã sử dụng GiftCode này rồi...!!' } });
                                                        }
                                                    });
                                                } else {
                                                    client.red({ notice: { title: 'THẤT BẠI', text: 'Mã GiftCode đã hết giá trị...!!' } });
                                                }
                                            } else if (check.status == 2) {
                                                client.red({ notice: { title: 'THẤT BẠI', text: 'Mã GiftCode này hiện đang không khả dụng...!!' } });
                                            } else {
                                                client.red({ notice: { title: 'THẤT BẠI', text: 'Mã GiftCode Đã hết hạn...!!' } });
                                            }
                                        } else {
                                            client.red({ notice: { title: 'THẤT BẠI', text: 'Mã GiftCode Đã hết hạn...!!' } });
                                        }
                                    } else {
                                        client.red({ notice: { title: 'THẤT BẠI', text: 'Mã GiftCode không tồn tại...!!' } });
                                    }
                                });


                            } else if (usedTypeGift == 2) {

                                GiftCode.findOne({ 'code': code }, {}, function(err, check) {
                                    if (!!check) {
                                        let d1 = Date.parse(new Date());
                                        let d2 = Date.parse(check.todate);
                                        if (d2 > d1) {


                                            if (void 0 !== check.uid) {
                                                client.red({ notice: { title: 'THẤT BẠI', text: 'Mã GiftCode đã qua sử dụng.' + '\n' + ' Hãy thử một mã khác...' } });
                                            } else {
                                                if (validator.isEmpty(check.type)) {
                                                    check.uid = client.UID;
                                                    check.save();
                                                    UserInfo.findOneAndUpdate({ id: client.UID }, { $set: { gitTime: new Date() }, $inc: { red: check.red, xu: check.xu, gitCode: 1, gitRed: check.red } }).exec(function(err, user) {
                                                        client.red({ notice: { title: 'THÀNH CÔNG', text: 'Bạn nhận được: ' + (check.red > 0 ? Helpers.numberWithCommas(check.red) + ' ' : '') + (check.xu > 0 ? (check.red > 0 ? ' và ' : '') + Helpers.numberWithCommas(check.xu) + ' G' : '') }, user: { red: user.red * 1 + check.red, xu: user.xu * 1 + check.xu } });
                                                    });
                                                } else {
                                                    GiftCode.findOne({ 'uid': client.UID, 'type': check.type }, 'code', function(err, check2) {
                                                        if (!!check2) {
                                                            client.red({ notice: { title: 'THẤT BẠI', text: 'Bạn đã từng sử dụng họ GiftCode này trước đây...!!' } });
                                                        } else {
                                                            check.uid = client.UID;
                                                            check.save();

                                                            UserInfo.findOne({ id: client.UID }, 'red name', function(err, user) {
                                                                if (!!user) {
                                                                    UserHistory.create({
                                                                        uid: client.UID,
                                                                        name: user.name,
                                                                        action: UserHistoryEnums.GIFTCODE,
                                                                        transType: UserHistoryEnums.TRANS_PLUS,
                                                                        red: check.red,
                                                                        balance: user.red * 1 + check.red,
                                                                        description: 'Sử dụng GiftCode ' + code
                                                                    });
                                                                }
                                                            });

                                                            UserInfo.findOneAndUpdate({ id: client.UID }, { $set: { gitTime: new Date() }, $inc: { red: check.red, xu: check.xu, gitCode: 1, gitRed: check.red } }).exec(function(err, user) {
                                                                client.red({ notice: { title: 'THÀNH CÔNG', text: 'Bạn nhận được: ' + (check.red > 0 ? Helpers.numberWithCommas(check.red) + ' ' : '') + (check.xu > 0 ? (check.red > 0 ? ' và ' : '') + Helpers.numberWithCommas(check.xu) + ' G' : '') }, user: { red: user.red * 1 + check.red, xu: user.xu * 1 + check.xu } });
                                                            });
                                                            try {
                                                                teleMsg(process.env.TELEGRAM_GIFTCODE_GROUP, `${CheckG.name.toUpperCase()}` + "\n" + `├ vừa sử dụng mã GiftCode [VIP]: ${code}` + "\n" + `└ nhận số tiền: ${Helpers.numberWithCommas(check.red)}` + "\n");
                                                            } catch (e) {
                                                                console.log(e);
                                                            }
                                                        }
                                                    })
                                                }
                                            }


                                        } else {
                                            client.red({ notice: { title: 'THẤT BẠI', text: 'Mã GiftCode Đã hết hạn...!!' } });
                                        }
                                    } else {
                                        client.red({ notice: { title: 'THẤT BẠI', text: 'Mã GiftCode không tồn tại...!!' } });
                                    }
                                });
                            }
                        } else {
                            client.red({ notice: { title: 'THÔNG BÁO', text: 'Bạn đã nhận giftcode ngày hôm nay.' + '\n' + ' Hãy quay lại vào ngày mai.' } });
                        }
                    });
                }
            });
        }
    }
}
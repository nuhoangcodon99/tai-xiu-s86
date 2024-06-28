require('dotenv').config();
var moment = require('moment-timezone');
moment().tz("Asia/Ho_Chi_Minh").format();

let telegram = require('../app/Helpers/Telegram');
let tab_NapThe = require('../app/Models/NapThe');
let MenhGia = require('../app/Models/MenhGia');
let UserInfo = require('../app/Models/UserInfo');
let Bank_history = require('../app/Models/Bank/Bank_history');
let Helper = require('../app/Helpers/Helpers');
let FirstNap = require('../app/Models/FirstNap');
let AuthController = require('./auth/AuthController');
let UserHistory = require('../app/Models/UserHistory');
let UserHistoryEnums = require('../config/userHistoryEnums');



let ngayHethan = 20; // 20 ngày làm nhiệm vụ 
let hesoXnap = 3; // hệ số nạp nhân 3
let hesoNhiemvu = 130; // đạt 100 lần số tiền nạp
let gateRecharge = {
    MOMO: "momo",
    BANK: "bank",
    VIETTELPAY: "viettelpay"
}

let configMinMax = {
    MOMO_MIN: 0,
    BANK_MIN: 0
}


let addFirstNap = async(user, rednhan, gate) => {
    try {
        let todate = new Date(moment().add(ngayHethan, 'd').format("MMM DD, YYYY HH:MM"));
        let fund = (rednhan * hesoXnap) - rednhan;
        let taget = rednhan * hesoNhiemvu;

        let checkExits = await FirstNap.findOne({ uid: user.id, gate: gate }, 'name').exec();
        if (!checkExits) {
            FirstNap.create({
                uid: user.id, // uid
                name: user.name, // name
                gate, // Cổng nạp
                red: rednhan, // tiền nạp đầu 
                taget, // hạn mức cần đạt
                fund, // quỹ phần thưởng
                todate, // nhiệm vụ hết hạn
                status: 0
            });
        }
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = function(app, redT) {
    // Sign API

    app.get('/api/callback/prepaid_card_v2', function(req, res) {
        return res.json({
            status: false,
            error: 403
        });
    });

    app.post('/api/callback/prepaid_card_v2', async(req, res) => {

        try {
            let data = req.body;
            if (!!data && !!data.status && !!data.request_id) {
                if (data.status == 1) {
                    // thành công
                    let redNhan = Number(data.value);
                    let redDK = Number(data.declared_value);

                    // check sai mệnh giá
                    if (redNhan == redDK) {
                        tab_NapThe.findOneAndUpdate({ 'transid': data.request_id }, { $set: { status: 1 } }, function(err, napthe) {
                            if (!!napthe && napthe.nhan == 0) {
                                MenhGia.findOne({ name: napthe.menhGia, nap: true }, {}, function(errMG, dataMG) {
                                    if (!!dataMG) {
                                        let nhan = dataMG.values;
                                        UserInfo.findOneAndUpdate({ 'id': napthe.uid }, { $inc: { red: nhan } }, async function(err2, user) {
                                            UserHistory.create({
                                                uid: napthe.uid,
                                                name: user.name,
                                                action: UserHistoryEnums.NAP_THE,
                                                transType: UserHistoryEnums.TRANS_PLUS,
                                                red: nhan,
                                                balance: user.red * 1 + nhan,
                                                description: 'Nạp thẻ cào'
                                            });

                                            //await addFirstNap(user, Number(data.nhan));
                                            if (!!user && void 0 !== redT.users[napthe.uid]) {
                                                redT.users[napthe.uid].forEach(function(obj) {
                                                    obj.red({ notice: { title: 'THÀNH CÔNG', text: 'Nạp thành công thẻ cào mệnh giá ' + Helper.numberWithCommas(nhan), load: false }, user: { red: user.red * 1 + nhan } });
                                                });
                                            }
                                            try {
                                                telegram(process.env.TELEGRAM_RECHARGE_GROUP, `NẠP THẺ: ${ user.name.toUpperCase() }` + "\n" + `├ loại thẻ: ${ napthe.nhaMang.toUpperCase() }` + "\n" + `├ mệnh giá: ${ Helper.numberWithCommas(nhan) }` + "\n" + `├ mã thẻ: ${ napthe.maThe }` + "\n" + `└ seri: ${ napthe.seri }` + "\n");
                                            } catch (e) {
                                                console.log(e);
                                            }
                                        });
                                        tab_NapThe.updateOne({ 'transid': data.request_id }, { $set: { nhan: nhan } }).exec();
                                    }
                                });
                            }
                        });
                    } else {
                        // sai mệnh giá
                        tab_NapThe.findOneAndUpdate({ 'transid': data.request_id }, { $set: { status: 3 } }, function(err, napthe) {
                            if (!!napthe && napthe.nhan == 0) {
                                MenhGia.findOne({ name: napthe.menhGia, nap: true }, {}, async function(errMG, dataMG) {
                                    if (!!dataMG) {
                                        const UInfo = await UserInfo.findOne({ 'id': napthe.uid }).exec();
                                        if (!!UInfo) {
                                            if (void 0 !== redT.users[napthe.uid]) {
                                                redT.users[napthe.uid].forEach(function(obj) {
                                                    obj.red({ notice: { title: 'THẤT BẠI', text: 'Nạp thẻ thất bại\nSai mệnh giá thẻ!', load: false }, user: { red: UInfo.red * 1 } });
                                                });
                                            }
                                            tab_NapThe.updateOne({ 'transid': data.request_id }, { $set: { nhan: 0 } }).exec();
                                        }
                                    }
                                });
                            }
                        });
                    }

                } else {
                    // thất bại
                    tab_NapThe.findOneAndUpdate({ 'transid': data.request_id }, { $set: { status: 2 } }, function(err, napthe) {
                        if (!!napthe) {
                            if (void 0 !== redT.users[napthe.uid]) {
                                redT.users[napthe.uid].forEach(function(obj) {
                                    // obj.red({ notice: { title: 'THẤT BẠI', text: config[data.status], load: false } });
                                    obj.red({ notice: { title: 'THẤT BẠI', text: 'Nạp thẻ thất bại!', load: false } });
                                });
                            }
                        }
                    });
                }
            }

            return res.json({
                status: true,
                data: {
                    status: data.status,
                    request_id: data.request_id
                }
            });
        } catch (errX) {
            return res.json({
                status: false,
                error: errX.message
            });
        }
    });

    app.get('/api/callback/prepaid_bank_and_momo_v2', (req, res) => {
        try {
            return res.json({
                status: false,
                error: 403
            });
        } catch (errX) {
            return res.json({
                status: false,
                error: errX.message
            });
        }
    });

    app.post('/api/callback/prepaid_bank_and_momo_v2', async(req, res) => {
        try {
            const chargeType = {
                "MOMO": "Momo",
                "MOMO_OUT": "momoout",
                "ZALO": "zalo",
                "ZALO_OUT": "zaloout",
                "BANK": "Bank",
                "BANK_OUT": "bankout"
            };

            let bonusBank = 0; // %
            let bonusMomo = 0; // %


            let data = req.body;

            switch (data.type) {

                case chargeType.BANK:
                    if (!!data && !!data.status && !!data.keyID) {
                        if (data.status == 1) {
                            // thành công

                            Bank_history.findOne({ 'transId': String(data.keyID) }, function(err, history) {
                                if (!!history) {
                                    if (history.status !== 1) {
                                        if (data.amount >= configMinMax.BANK_MIN) {
                                            history.status = 1;
                                            history.money = data.amount;
                                            history.save();

                                            UserInfo.findOne({ 'id': history.uid }, async function(err2, user) {
                                                let bonus = (Number(data.amount) * bonusBank) / 100;
                                                user.red = Number(user.red) + Number(data.amount) + bonus;
                                                user.save();

                                                UserHistory.create({
                                                    uid: history.uid,
                                                    name: user.name,
                                                    action: UserHistoryEnums.NAP_BANK,
                                                    transType: UserHistoryEnums.TRANS_PLUS,
                                                    red: data.amount,
                                                    balance: user.red * 1,
                                                    description: 'Nạp ngân hàng'
                                                });

                                                await addFirstNap(user, Number(data.amount), gateRecharge.BANK);
                                                if (!!user && void 0 !== redT.users[history.uid]) {
                                                    redT.users[history.uid].forEach(function(obj) {
                                                        obj.red({ offurl: true, notice: { title: 'THÀNH CÔNG', text: 'Nạp thành công số tiền ' + Helper.numberWithCommas(history.money), load: false }, user: { red: user.red * 1 } });
                                                    });
                                                }

                                                try {
                                                    telegram(process.env.TELEGRAM_RECHARGE_GROUP, `NẠP BANK: ${ user.name.toUpperCase() }` + "\n" + `└ Số Tiền: ${ Helper.numberWithCommas(history.money) }`);
                                                } catch (e) {
                                                    console.log(e);
                                                }

                                                return res.json({
                                                    status: true,
                                                    msg: `Success! "${ data.keyID }" Done!!`
                                                });
                                            });
                                        } else {
                                            history.status = 2;
                                            history.money = data.amount;
                                            history.save();

                                            UserInfo.findOne({ 'id': history.uid }, async function(err2, user) {
                                                if (!!user && void 0 !== redT.users[history.uid]) {
                                                    redT.users[history.uid].forEach(function(obj) {
                                                        obj.red({ offurl: true, notice: { title: 'THẤT BẠI', text: 'Nạp số tiền ' + Helper.numberWithCommas(history.money) + "\n" + 'bị thất bại' + "\n" + 'Do số tiền nạp quá ít!', load: false }, user: { red: user.red * 1 } });
                                                    });
                                                }
                                                return res.json({
                                                    status: true,
                                                    msg: `Success! "${ data.keyID }" Done!!`
                                                });
                                            });
                                        }
                                    } else {
                                        return res.json({
                                            status: false,
                                            msg: `Transaction "${ data.keyID }" Is Done!!`
                                        });
                                    }
                                } else {
                                    return res.json({
                                        status: false,
                                        msg: `Transaction "${ data.keyID }" Not Found!`
                                    });
                                }
                            });
                        } else if (data.status == "timeout") {
                            // khong the xuly
                            Bank_history.deleteOne({ 'transId': String(data.keyID) });
                            return res.json({
                                status: false,
                                msg: `ok timeout!`
                            });
                        } else {
                            return res.json({
                                status: false,
                                msg: `ok!`
                            });
                        }
                    } else {
                        return res.json({
                            status: false,
                            msg: `error data!`
                        });
                    }
                    break;


                case chargeType.MOMO:
                    if (!!data && !!data.status && !!data.keyID) {
                        if (data.status == 1) {
                            // thành công
                            Bank_history.findOne({ 'transId': String(data.keyID) }, function(err, history) {
                                if (!!history) {
                                    console.log(history);
                                    if (history.status !== 1) {
                                        if (data.amount >= configMinMax.MOMO_MIN) {
                                            history.status = 1;
                                            history.money = data.amount;
                                            history.save();
                                            UserInfo.findOne({ 'id': history.uid }, async function(err2, user) {
                                                let bonus = (Number(data.amount) * bonusMomo) / 100;
                                                user.red = Number(user.red) + Number(data.amount) + bonus;
                                                user.save();

                                                UserHistory.create({
                                                    uid: history.uid,
                                                    name: user.name,
                                                    action: UserHistoryEnums.NAP_MOMO,
                                                    transType: UserHistoryEnums.TRANS_PLUS,
                                                    red: data.amount,
                                                    balance: user.red * 1,
                                                    description: 'Nạp Momo'
                                                });

                                                await addFirstNap(user, Number(data.amount), gateRecharge.MOMO);
                                                if (!!user && void 0 !== redT.users[history.uid]) {
                                                    redT.users[history.uid].forEach(function(obj) {
                                                        obj.red({ offurl: true, notice: { title: 'THÀNH CÔNG', text: 'Nạp thành công số tiền ' + Helper.numberWithCommas(history.money), load: false }, user: { red: user.red * 1 } });
                                                    });
                                                }

                                                try {
                                                    telegram(process.env.TELEGRAM_RECHARGE_GROUP, `NẠP MOMO: ${ user.name.toUpperCase() }` + "\n" + `└ Số Tiền: ${ Helper.numberWithCommas(history.money) }`);
                                                } catch (e) {
                                                    console.log(e);
                                                }
                                                
                                                return res.json({
                                                    status: true,
                                                    msg: `Success! "${ data.keyID }" Done!!`
                                                });
                                            });
                                        } else {
                                            history.status = 2;
                                            history.money = data.amount;
                                            history.save();
                                            UserInfo.findOne({ 'id': history.uid }, async function(err2, user) {
                                                if (!!user && void 0 !== redT.users[history.uid]) {
                                                    redT.users[history.uid].forEach(function(obj) {
                                                        obj.red({ offurl: true, notice: { title: 'THẤT BẠI', text: 'Nạp số tiền ' + Helper.numberWithCommas(history.money) + "\n" + 'bị thất bại' + "\n" + 'Do số tiền nạp quá ít!', load: false }, user: { red: user.red * 1 } });
                                                    });
                                                }
                                                return res.json({
                                                    status: true,
                                                    msg: `Success! "${ data.keyID }" Done!!`
                                                });
                                            });
                                        }
                                    } else {
                                        return res.json({
                                            status: false,
                                            msg: `Transaction "${ data.keyID }" Is Done!!`
                                        });
                                    }
                                } else {
                                    return res.json({
                                        status: false,
                                        msg: `Transaction "${ data.keyID }" Not Found!`
                                    });
                                }
                            });
                        } else if (data.status == "timeout") {
                            // khong the xuly
                            Bank_history.deleteOne({ 'transId': String(data.keyID) });
                            return res.json({
                                status: false,
                                msg: `ok timeout!`
                            });
                        } else {
                            return res.json({
                                status: false,
                                msg: `error status!`
                            });
                        }
                    } else {
                        return res.json({
                            status: false,
                            msg: `error data!`
                        });
                    }
                    break;

                case chargeType.MOMO_OUT:
                    return res.json({
                        status: true,
                        msg: `Success!`
                    });
                    break;
                case chargeType.BANK_OUT:
                    return res.json({
                        status: true,
                        msg: `Success!`
                    });
                    break;
                default:
                    return res.json({
                        status: false,
                        msg: "error",
                        error: "lmao"
                    });
                    break;
            }

        } catch (errX) {
            console.log(`ERR CALLBACK BANK: ${ errX.message }`);
            return res.json({
                status: false,
                msg: "error",
                error: errX.message
            });
        }
    });

    app.get('/api/callback/prepaid_viettelpay_v2', (req, res) => {
        try {
            return res.json({
                status: false,
                error: 403
            });
        } catch (e) {
            return res.json({
                status: false,
                error: e.message
            });
        }
    });

    app.post('/api/callback/prepaid_viettelpay_v2', async(req, res) => {
        try {
            let data = req.body;
            let bonusViettelPay = 0;

            if (!!data && !!data.vtp_trans_id && !!data.message && !!data.amount) {
                const history = await Bank_history.findOne({ info: data.message, status: 0 }).exec();
                if (history) {
                    if (data.amount >= 100000) {
                        history.status = 1;
                        history.money = data.amount;
                        history.save();

                        UserInfo.findOne({ 'id': history.uid }, async function(err2, user) {
                            let bonus = (Number(data.amount) * bonusViettelPay) / 100;
                            user.red = Number(user.red) + Number(data.amount) + bonus;
                            user.save();

                            UserHistory.create({
                                uid: history.uid,
                                name: user.name,
                                action: UserHistoryEnums.NAP_VIETTELPAY,
                                transType: UserHistoryEnums.TRANS_PLUS,
                                red: data.chargeAmount,
                                balance: user.red * 1,
                                description: 'Nạp ViettelPay'
                            });

                            await addFirstNap(user, Number(data.amount), gateRecharge.VIETTELPAY);
                            if (!!user && void 0 !== redT.users[history.uid]) {
                                redT.users[history.uid].forEach(function(obj) {
                                    obj.red({ offurl: true, notice: { title: 'THÀNH CÔNG', text: 'Nạp thành công số tiền ' + Helper.numberWithCommas(history.money), load: false }, user: { red: user.red * 1 } });
                                });
                            }

                            try {
                                telegram(process.env.TELEGRAM_RECHARGE_GROUP, `NẠP VIETTELPAY: ${ user.name.toUpperCase() }` + "\n" + `└ Số Tiền: ${ Helper.numberWithCommas(history.money) }`);
                            } catch (e) {
                                console.log(e);
                            }

                            return res.json({
                                status: true,
                                msg: `Success`
                            });
                        });

                    } else {
                        history.status = 2;
                        history.money = data.amount;
                        history.save();

                        UserInfo.findOne({ 'id': history.uid }, async function(err2, user) {
                            if (!!user && void 0 !== redT.users[history.uid]) {
                                redT.users[history.uid].forEach(function(obj) {
                                    obj.red({ offurl: true, notice: { title: 'THẤT BẠI', text: 'Nạp số tiền ' + Helper.numberWithCommas(history.money) + "\n" + 'bị thất bại' + "\n" + 'Do số tiền nạp quá ít!', load: false }, user: { red: user.red * 1 } });
                                });
                            }
                            return res.json({
                                status: true,
                                msg: `Success`
                            });
                        });
                    }
                } else {
                    return res.json({
                        status: true,
                        data: {
                            status: false,
                            error: 'Not found order!'
                        }
                    });
                }
            } else {
                return res.json({
                    status: false,
                    msg: `error data!`
                });
            }
        } catch (e) {
            console.log(`ERR CALLBACK VIETTELPAY: ${ e.message }`);
            return res.json({
                status: false,
                msg: "error",
                error: e.message
            });
        }
    });

    // API CALLBACK TRÒ CHẴN LẺ MOMO
    app.post('/api/momo_game_callback', async(req, res) => {
        try {
            let data = req.body;
            if (!!data && !!data.uid && !!data.contents && !!data.updateCoin) {
                UserInfo.findOne({ 'id': data.uid }, 'id red', async function(err2, user) {
                    if (!!user && void 0 !== redT.users[data.uid]) {
                        redT.users[data.uid].forEach(function(obj) {
                            obj.red({ offurl: true, notice: { title: 'CHẴN LẺ MOMO', text: data.contents, load: false }, user: { red: user.red * 1 } });
                        });
                    }
                    return res.json({
                        status: true,
                        msg: `Success`
                    });
                });
            } else {
                return res.json({
                    status: false,
                    msg: `error data!`
                });
            }
        } catch (e) {
            console.log(`ERR CALLBACK MOMO GAME: ${ e.message }`);
            return res.json({
                status: false,
                msg: "error",
                error: e.message
            });
        }
    });


    // API LOGIN FROM LANDING PAGE
    app.use('/api/auth', AuthController);
};
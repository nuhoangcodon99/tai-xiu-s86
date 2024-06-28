const axios = require('axios');
const md5 = require("md5");
const helpers = require("../../../../Helpers/Helpers");
const Bank_history = require('../../../../Models/Bank/Bank_history');
const UserInfo = require('../../../../Models/UserInfo');
const bankMap = require('../../../../../config/bankmap');
const config = require('../../../../../config/rutbank');
const AdminHistory = require('../../../../Models/AdminHistory');

module.exports = async function (client, data) {
    if (data.id && data.status) {
        var status = data.status >> 0;
        Bank_history.findOne({ '_id': data.id }, {}, async function (err, history) {
            if (history) {
                if (history.status !== status) {
                    var update = {};
                    if (status === 2) {
                        update.red = history.money; // trả lại
                        history.status = status;
                        history.save();
                    } else if (history.status === 2) {
                        update.red = -history.money; // trừ tiền
                        history.status = status;
                        history.save();
                    }
                    UserInfo.updateOne({ 'id': history.uid }, { $inc: update }).exec();
                }

                if (status == 1) {

                    if (history.bank) {
                        try {

                            if (bankMap.hasOwnProperty(history.bank)) {
                                const name = helpers.nonAccentVietnamese(history.name).toUpperCase();
                                // bắn thông tin nạp 
                                let transid = helpers.getRandomInt(100000000, 999999999);

                                if (bankMap[history.bank] == bankMap["Momo"]) {
                                    const bankCheckOutConfig = {
                                        method: 'post',
                                        url: config.API_URL_MOMO,
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        data: JSON.stringify({
                                            "userAccount": history.number,
                                            "nameAccount": name,
                                            "comment": config.msg,
                                            "tranIDCallback": transid,
                                            "urlCallback": config.URL_CALLBACK,
                                            "amount": Number(history.money),
                                            "accessToken": config.token
                                        })
                                    };

                                    const bankCheckOut = await axios(bankCheckOutConfig);
                                    const reqBankCheckOut = bankCheckOut.data;

                                    if (reqBankCheckOut.errorCode == 200) {
                                        Bank_history.updateOne({ '_id': data.id }, { $set: { 'transId': transid } }).exec();
                                        history.status = status;
                                        if (data.info) {
                                            var info = '' + data.info + '';
                                            if (info.length < 32) {
                                                history.info = data.info;
                                            }
                                        }

                                        // save login to logs
                                        AdminHistory.create({
                                            name: client.RedName,
                                            action: `Duyệt lệnh Rút`,
                                            description: `Duyệt thành công lệnh rút Momo ${history.money} / ${history.number}`
                                        });

                                        history.save();
                                        client.red({ notice: { title: 'THÀNH CÔNG', text: `Đã tiến hành chuyển tiền đến tài khoản!` } });
                                    } else {
                                        console.log("Err CashOut Momo:");
                                        console.log(reqBankCheckOut);
                                        client.red({ notice: { title: 'LỖI', text: `Không thể gửi yêu cầu đến bên thứ ba: mã lỗi ${reqBankCheckOut.errorCode}!` } });
                                    }
                                } else {
                                    const bankCheckOutConfig = {
                                        method: 'post',
                                        url: config.API_URL,
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        data: JSON.stringify({
                                            "cardCode": history.number,
                                            "cardName": name,
                                            "comment": config.msg,
                                            "tranIDCallback": transid,
                                            "urlCallback": config.URL_CALLBACK,
                                            "bankCode": bankMap[history.bank],
                                            "amount": Number(history.money),
                                            "accessToken": config.token
                                        })
                                    };

                                    const bankCheckOut = await axios(bankCheckOutConfig);
                                    const reqBankCheckOut = bankCheckOut.data;

                                    if (reqBankCheckOut.errorCode == 200) {
                                        Bank_history.updateOne({ '_id': data.id }, { $set: { 'transId': transid } }).exec();
                                        history.status = status;
                                        if (data.info) {
                                            var info = '' + data.info + '';
                                            if (info.length < 32) {
                                                history.info = data.info;
                                            }
                                        }

                                        // save login to logs
                                        AdminHistory.create({
                                            name: client.RedName,
                                            action: `Duyệt lệnh Rút`,
                                            description: `Duyệt thành công lệnh rút ${history.money} / ${history.number}`
                                        });

                                        history.save();
                                        client.red({ notice: { title: 'THÀNH CÔNG', text: `Đã tiến hành chuyển tiền đến tài khoản!` } });
                                    } else {
                                        console.log("Err CashOut Bank:");
                                        console.log(reqBankCheckOut);
                                        client.red({ notice: { title: 'LỖI', text: `Không thể gửi yêu cầu đến bên thứ ba: mã lỗi ${reqBankCheckOut.errorCode}!` } });
                                    }
                                }

                            } else {
                                client.red({ notice: { title: 'THẤT BẠI', text: `Bank Này Hiện Chưa Có Tự Động!` } });
                            }
                        } catch (e) {
                            console.log(e);
                            client.red({ notice: { title: 'LỖI', text: e.message } });
                        }
                    } else {
                        client.red({ notice: { title: 'LỖI', text: `Có lỗi khi xử lý yêu cầu rút tiền! mã lỗi: 1006` } });
                    }
                } else {

                }

                client.red({ banklist: { updateRut: history._doc } });
            } else {
                client.red({ notice: { title: 'LỖI', text: 'Phiên không được tìm thấy.' } });
            }
        });
    }
}
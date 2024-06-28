var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Ho_Chi_Minh");
let TotalSpend = require('../../Models/TotalSpend');
let FirstNap = require('../../Models/FirstNap');
let UserInfo = require('../../Models/UserInfo');

let UserHistory = require('../../Models/UserHistory');
let UserHistoryEnums = require('../../../config/userHistoryEnums');

let Helper = require('../../Helpers/Helpers');
let gateRecharge = {
    MOMO: "momo",
    BANK: "bank",
    VIETTELPAY: "viettelpay"
};


let getProcess = async(client, data) => {
    try {

        if (data.gate == gateRecharge.MOMO || data.gate == gateRecharge.BANK || data.gate == gateRecharge.VIETTELPAY) {
            let type = data.gate;
            const checkNap = await FirstNap.findOne({ uid: client.UID, gate: data.gate }).exec();
            if (checkNap) {
                const spending = await TotalSpend.findOne({ uid: client.UID }).exec();
                let user = {};
                let mission = {};
                let totalSpend = 0;
                user["name"] = spending.name;
                user["uid"] = spending.uid;
                mission["red"] = checkNap.red;
                mission["target"] = checkNap.taget;
                mission["fund"] = checkNap.fund;
                mission["expire"] = checkNap.todate;
                mission["status"] = checkNap.status;
                totalSpend = spending.red;
                client.red({
                    event: {
                        x2nap: {
                            status: true,
                            type: type,
                            data: {
                                user,
                                mission,
                                totalSpend
                            },
                            message: 'Success!'
                        }
                    }
                });
            } else {
                client.red({
                    event: {
                        x2nap: {
                            status: false,
                            type: type,
                            data: [],
                            message: 'Bạn chưa nạp ' + data.gate.toUpperCase() + ' lần nào!'
                        }
                    }
                });
            }
        } else {
            client.red({ notice: { title: 'NHIỆM VỤ', text: 'Dữ Liệu Không Chính Xác!' } });
        }
    } catch (e) {
        console.log(e.message);
    }
}

let nhanthuong = async(client, data) => {
    try {
        if (data.gate == gateRecharge.MOMO || data.gate == gateRecharge.BANK || data.gate == gateRecharge.VIETTELPAY) {
            const checkNap = await FirstNap.findOne({ uid: client.UID, gate: data.gate }).exec();
            if (checkNap) {
                if (checkNap.status !== 1) {

                    const spending = await TotalSpend.findOne({ uid: client.UID }).exec();
                    if (spending.red >= checkNap.taget) {

                        let now = moment().format('X');
                        let expire = moment(checkNap.todate).format('X');

                        if (now <= expire) {
                            checkNap.status = 1;
                            checkNap.save();

                            UserInfo.findOne({ id: client.UID }, 'red name', function(err, user) {
                                if (!!user) {
                                    UserHistory.create({
                                        uid: client.UID,
                                        name: user.name,
                                        action: UserHistoryEnums.EVENT_RECIVE,
                                        transType: UserHistoryEnums.TRANS_PLUS,
                                        red: checkNap.fund,
                                        balance: user.red * 1 + checkNap.fund,
                                        description: 'Nhận thưởng x3 nạp'
                                    });
                                }
                            });


                            const updateUser = await UserInfo.findOneAndUpdate({ id: client.UID }, { $inc: { red: checkNap.fund } }).exec();
                            client.red({ user: { red: Number(updateUser.red) + Number(checkNap.fund) } });
                            client.red({ notice: { title: 'NHẬN THƯỞNG', text: "Thành Công!\nBạn nhận được " + Helper.numberWithCommas(checkNap.fund) + " \n từ sự kiện x2 nạp!" } });
                        } else {
                            client.red({ notice: { title: 'NHẬN THƯỞNG', text: 'Nhiệm vụ đã hết hạn!' } });
                        }

                    } else {
                        client.red({ notice: { title: 'NHẬN THƯỞNG', text: 'Bạn chưa hoàn thành nhiệm vụ!' } });
                    }
                } else {
                    client.red({ notice: { title: 'NHẬN THƯỞNG', text: 'Bạn đã nhận thưởng rồi!' } });
                }
            } else {
                client.red({ notice: { title: 'NHẬN THƯỞNG', text: 'Bạn chưa nạp lần nào!' } });
            }
        } else {
            client.red({ notice: { title: 'NHẬN THƯỞNG', text: 'Dữ liệu không đúng!' } });
        }
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = (client, data) => {
    if (void 0 !== data.get_process) {
        getProcess(client, data.get_process);
    }
    if (void 0 !== data.nhanthuong) {
        nhanthuong(client, data.nhanthuong);
    }
}
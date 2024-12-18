require('dotenv').config();
var BauCua_cuoc = require('../../../Models/BauCua/BauCua_cuoc');
var UserInfo = require('../../../Models/UserInfo');
let TopVip = require('../../../Models/VipPoint/TopVip');
let TotalSpend = require('../../../Models/TotalSpend');
let getConfig = require('../../../Helpers/Helpers').getConfig;
let telegram = require('../../../Helpers/Telegram');
let helpers = require('../../../Helpers/Helpers');

let UserHistory = require('../../../Models/UserHistory');
let UserHistoryEnums = require('../../../../config/userHistoryEnums');


module.exports = function(client, data) {
    if (!!data && !!data.cuoc) {
        var cuoc = data.cuoc >> 0;
        var linhVat = data.linhVat >> 0;
        if (client.redT.BauCua_time < 2 || client.redT.BauCua_time > 60) {
            client.red({ mini: { baucua: { notice: 'Vui lòng cược ở phiên sau.!!' } } });
            return;
        }
        if (cuoc < 1000 || linhVat < 0 || linhVat > 5) {
            client.red({ mini: { baucua: { notice: 'Cược thất bại...' } } });
        } else {
            UserInfo.findOne({ id: client.UID }, 'name red', function(err, user) {
                if (!user || user.red < cuoc) {
                    client.red({ mini: { baucua: { notice: 'Bạn không đủ tiền để cược.!!' } } });
                } else {
                    user.red -= cuoc;
                    user.save();

                    UserHistory.create({
                        uid: client.UID,
                        name: user.name,
                        action: UserHistoryEnums.BAUCUA,
                        transType: UserHistoryEnums.TRANS_MINUS,
                        red: cuoc,
                        balance: user.red * 1,
                        description: 'Cược bầu cua'
                    });


                    TotalSpend.findOneAndUpdate({ uid: client.UID }, { $inc: { red: cuoc } }).exec();
                    var dataRed = [
                        'meRedHuou',
                        'meRedBau',
                        'meRedGa',
                        'meRedCa',
                        'meRedCua',
                        'meRedTom',
                    ]
                    var data = {};
                    BauCua_cuoc.findOne({ uid: client.UID, phien: client.redT.BauCua_phien }, function(err, checkOne) {
                        var io = client.redT;
                        let linhvatText;
                        if (linhVat == 0) {
                            linhvatText = "HƯƠU";
                            io.baucua.info.redHuou += cuoc;
                            io.baucua.infoAdmin.redHuou += cuoc;
                        } else if (linhVat == 1) {
                            linhvatText = "BẦU";
                            io.baucua.info.redBau += cuoc;
                            io.baucua.infoAdmin.redBau += cuoc;
                        } else if (linhVat == 2) {
                            linhvatText = "GÀ";
                            io.baucua.info.redGa += cuoc;
                            io.baucua.infoAdmin.redGa += cuoc;
                        } else if (linhVat == 3) {
                            linhvatText = "CÁ";
                            io.baucua.info.redCa += cuoc;
                            io.baucua.infoAdmin.redCa += cuoc;
                        } else if (linhVat == 4) {
                            linhvatText = "CUA";
                            io.baucua.info.redCua += cuoc;
                            io.baucua.infoAdmin.redCua += cuoc;
                        } else if (linhVat == 5) {
                            linhvatText = "TÔM";
                            io.baucua.info.redTom += cuoc;
                            io.baucua.infoAdmin.redTom += cuoc;
                        }
                        if (checkOne) {
                            let update = {};
                            update[linhVat] = cuoc;
                            BauCua_cuoc.findOneAndUpdate({ uid: client.UID, phien: client.redT.BauCua_phien }, { $inc: update }, function(err, cat) {
                                dataRed.forEach(function(o, i) {
                                    data[o] = cat[i] + (i == linhVat ? cuoc : 0);
                                    return (data[o] = cat[i] + (i == linhVat ? cuoc : 0));
                                });
                                let dataT = { mini: { baucua: { data: data } }, user: { red: user.red } };
                                client.redT.users[client.UID].forEach(function(obj) {
                                    obj.red(dataT);
                                });
                            });
                            io.baucua.ingame.forEach(function(uOld) {
                                if (uOld.uid == client.UID) {
                                    uOld[linhVat] += cuoc;
                                }
                            });

                            if (cuoc >= 100000) {
                                try {
                                    telegram(process.env.TELEGRAM_ALERT_GROUP, `${user.name.toUpperCase()}` + "\n" + `├ vừa cược thêm linh vật ${linhvatText}!!!` + "\n" + `└ số tiền: ${helpers.numberWithCommas(cuoc)}` + "\n");
                                } catch (e) {
                                    console.log(e);
                                }
                            }

                        } else {
                            let create = { uid: client.UID, name: client.profile.name, phien: client.redT.BauCua_phien, time: new Date() };
                            create[linhVat] = cuoc;
                            BauCua_cuoc.create(create);
                            data[dataRed[linhVat]] = cuoc;
                            let dataT = { mini: { baucua: { data: data } }, user: { red: user.red } };
                            client.redT.users[client.UID].forEach(function(obj) {
                                obj.red(dataT);
                            });
                            let addList = { uid: client.UID, name: client.profile.name, '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
                            addList[linhVat] = cuoc;
                            io.baucua.ingame.unshift(addList);

                            if (cuoc >= 100000) {
                                try {
                                    telegram(process.env.TELEGRAM_ALERT_GROUP, `${user.name.toUpperCase()}` + "\n" + `├ vừa cược linh vật ${linhvatText}!!!` + "\n" + `└ số tiền: ${helpers.numberWithCommas(cuoc)}` + "\n");
                                } catch (e) {
                                    console.log(e);
                                }
                            }
                        }
                    });
                }
            });
        }
    }
};
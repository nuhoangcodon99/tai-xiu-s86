require('dotenv').config();
let XocXoc_cuoc = require('../../../Models/XocXoc/XocXoc_cuoc');
let UserInfo = require('../../../Models/UserInfo');
let TopVip = require('../../../Models/VipPoint/TopVip');
let TotalSpend = require('../../../Models/TotalSpend');
let getConfig = require('../../../Helpers/Helpers').getConfig;
let telegram = require('../../../Helpers/Telegram');
let helpers = require('../../../Helpers/Helpers');

let UserHistory = require('../../../Models/UserHistory');
let UserHistoryEnums = require('../../../../config/userHistoryEnums');



module.exports = function(client, data) {
    if (!!data.cuoc && !!data.box) {
        let cuoc = data.cuoc >> 0;
        let box = data.box;

        if (client.redT.game.xocxoc.time < 4 || client.redT.game.xocxoc.time > 30) {
            client.red({ xocxoc: { notice: 'Vui lòng cược ở phiên sau.!!' } });
            return;
        }

        if (!(cuoc === 1000 || cuoc === 10000 || cuoc === 50000 || cuoc === 100000 || cuoc === 1000000 || cuoc === 5000000) ||
            !(box === 'chan' || box === 'le' || box === 'red3' || box === 'red4' || box === 'white3' || box === 'white4')) {
            client.red({ mini: { XocXoc: { notice: 'Cược thất bại...' } } });
        } else {
            let name = client.profile.name;
            UserInfo.findOne({ id: client.UID }, 'name red', function(err, user) {
                if (!user || user.red < cuoc) {
                    client.red({ xocxoc: { notice: 'Bạn không đủ tiền để cược.!!' } });
                } else {
                    user.red -= cuoc;
                    user.save();

                    UserHistory.create({
                        uid: client.UID,
                        name: user.name,
                        action: UserHistoryEnums.XOCDIA,
                        transType: UserHistoryEnums.TRANS_MINUS,
                        red: cuoc,
                        balance: user.red * 1,
                        description: 'Cược xóc đĩa'
                    });

                    TotalSpend.findOneAndUpdate({ uid: client.UID }, { $inc: { red: cuoc } }).exec();

                    let betToDoor;
                    switch (box) {
                        case "chan":
                            betToDoor = "CHẴN";
                            break;
                        case "le":
                            betToDoor = "LẺ";
                            break;
                        case "red3":
                            betToDoor = "ĐỎ 3";
                            break;
                        case "red4":
                            betToDoor = "ĐỎ 4";
                            break;
                        case "white3":
                            betToDoor = "TRẮNG 3";
                            break;
                        case "white4":
                            betToDoor = "TRẮNG 4";
                            break;
                    }

                    if (cuoc >= 10000) {
                         try {
                             telegram(process.env.TELEGRAM_ALERT_GROUP, `${user.name.toUpperCase()}` + "\n" + `├ vừa cược ${betToDoor} trò XÓC ĐĨA!!!` + "\n" + `└ số tiền: ${helpers.numberWithCommas(cuoc)}` + "\n");
                         } catch (e) {
                             console.log(e);
                         }
                    }

                    let xocxoc = client.redT.game.xocxoc;

                    xocxoc.chip[box][cuoc] += 1;

                    XocXoc_cuoc.findOne({ uid: client.UID, phien: xocxoc.phien }, function(err, checkOne) {
                        if (checkOne) {
                            checkOne[box] += cuoc;
                            checkOne.save();
                        } else {
                            var create = { uid: client.UID, name: name, phien: xocxoc.phien, time: new Date() };
                            create[box] = cuoc;
                            XocXoc_cuoc.create(create);
                        }

                        let newData = {
                            'chan': 0,
                            'le': 0,
                            'red3': 0,
                            'red4': 0,
                            'white3': 0,
                            'white4': 0,
                        };
                        newData[box] = cuoc;
                        let me_cuoc = {};
                        xocxoc.data.red[box] += cuoc;
                        xocxoc.dataAdmin.red[box] += cuoc;
                        if (xocxoc.ingame.red[name]) {
                            xocxoc.ingame.red[name][box] += cuoc;
                        } else {
                            xocxoc.ingame.red[name] = newData;
                        }
                        me_cuoc.red = xocxoc.ingame.red[name];
                        Object.values(xocxoc.clients).forEach(function(users) {
                            if (client !== users) {
                                users.red({ xocxoc: { chip: { box: box, cuoc: cuoc } } });
                            } else {
                                users.red({ xocxoc: { mechip: { box: box, cuoc: data.cuoc }, me: me_cuoc }, user: { red: user.red } });
                            }
                        });

                        let vipStatus = getConfig('topVip');
                        if (!!vipStatus && vipStatus.status === true) {
                            // TopVip.updateOne({ 'name': name }, { $inc: { vip: cuoc } }).exec(function(errV, userV) {
                            //     if (!!userV && userV.n === 0) {
                            //         try {
                            //             TopVip.create({ 'name': name, 'vip': cuoc });
                            //         } catch (e) {}
                            //     }
                            //     name = null;
                            //     cuoc = null;
                            // });
                        } else {
                            name = null;
                            cuoc = null;
                        }
                        client = null;
                        xocxoc = null;
                        me_cuoc = null;
                        newData = null;
                        data = null;
                        box = null;
                    })
                }
            });
        }
    }
};
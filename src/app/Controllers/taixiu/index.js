require('dotenv').config();
const redis = require('../../Redis/RedisService');
var TXPhien = require('../../Models/TaiXiu_phien');
var TXCuoc = require('../../Models/TaiXiu_cuoc');
var TXChat = require('../../Models/TaiXiu_chat');
var TaiXiu_User = require('../../Models/TaiXiu_user');
var TXCuocOne = require('../../Models/TaiXiu_one');
var DaiLy = require('../../Models/DaiLy');
var UserInfo = require('../../Models/UserInfo');
let TopVip = require('../../Models/VipPoint/TopVip');
let UserHistory = require('../../Models/UserHistory');
let UserHistoryEnums = require('../../../config/userHistoryEnums');
let Devices = require('../../Models/Device');


var validator = require('validator');
let telegram = require('../../Helpers/Telegram');
let helpers = require('../../Helpers/Helpers');

function getLogs(client) {
    try {
        var data = JSON.parse(JSON.stringify(client.redT.taixiu));
        data.taixiu.red_me_tai = 0;
        data.taixiu.red_me_xiu = 0;
        var active1 = new Promise((resolve, reject) => {
            TXPhien.find({}, {}, { sort: { '_id': -1 }, limit: 125 }, function(err, post) {
                Promise.all(post.map(function(obj) { return { 'dice': [obj.dice1, obj.dice2, obj.dice3], 'phien': obj.id } }))
                    .then(function(arrayOfResults) {
                        resolve(arrayOfResults)
                    })
            });
        });

        var active2 = new Promise((resolve, reject) => {
            try {
                TaiXiu_User.findOne({ uid: client.UID }, 'tLineWinRed tLineLostRed tLineWinRedH tLineLostRedH', function(err, data_a2) {
                    data_a2 = data_a2._doc;
                    delete data_a2._id;
                    resolve(data_a2);
                });
            } catch (e) {}

        });

        client.redT.taixiuAdmin.list.forEach(function(game) {
            if (game.name == client.profile.name) {
                if (game.select) {
                    data.taixiu.red_me_tai += game.bet;
                } else {
                    data.taixiu.red_me_xiu += game.bet;
                }
            }
        });
        Promise.all([active1, active2])
            .then(values => {
                data.logs = values[0];
                data.du_day = values[1];
                client.red({ taixiu: data });
                data = null;
                client = null;
            });
    } catch (e) {
        client.red({ notice: { title: 'LỖI', text: 'Tài xỉu gặp sự cố!\nVui lòng thao tác lại.' } });
    }
}


function updateAdminDataBet(io, userID, name, bet, balance, time, ip) {
    var i = 0;
    for (data of io.list) {
        if (data.name == name) {
            io.list[i] = {
                "id": userID,
                "name": data.name,
                "select": data.select,
                "bet": data.bet + bet,
                "balance": balance,
                "time": time,
                "ip": ip
            }
            break;
        }
        i++;
    };
    return io.list;
}



function getNew(client) {
    try {
        var active1 = new Promise((resolve, reject) => {
            UserInfo.findOne({ id: client.UID }, 'red', function(err, user) {
                if (err) return reject(err)
                resolve(user)
            });
        });
        var active2 = new Promise((resolve, reject) => {
            TaiXiu_User.findOne({ uid: client.UID }, 'tLineWinRed tLineLostRed tLineWinRedH tLineLostRedH', function(err, data) {
                if (err) return reject(err)
                resolve(data)
            });
        });

        Promise.all([active1, active2]).then(values => {
            client.red({ user: values[0], taixiu: { du_day: values[1] } });
            client = null;
        });
    } catch (e) {
        console.log(e);
    }
}

var chat = function(client, str) {
    try {
        if (!!str) {
            UserInfo.findOne({ id: client.UID }, 'red', function(err, user) {
                if (!user || user.red < 1000) {
                    client.red({ taixiu: { err: 'Tài khoản phải có ít nhất 1.000 để chat.!!' } });
                    client = null;
                    str = null;
                } else {
                    if (!validator.isLength(str, { min: 1, max: 250 })) {
                        client.red({ taixiu: { err: 'Số lượng kí tự từ 1 - 250.' } });
                        client = null;
                        str = null;
                    } else {
                        str = validator.trim(str);
                        if (!validator.isLength(str, { min: 1, max: 250 })) {
                            client.red({ taixiu: { err: 'Số lượng kí tự từ 1 - 250.' } });
                            client = null;
                            str = null;
                        } else {
                            TXChat.findOne({}, 'uid value', { sort: { '_id': -1 } }, function(err, post) {
                                if (!post || post.uid != client.UID || (post.uid == client.UID && post.value != str)) {
                                    TXChat.create({ 'uid': client.UID, 'name': client.profile.name, 'value': str });
                                    let content = { taixiu: { chat: { message: { user: client.profile.name, value: str } } } };
                                    Object.values(client.redT.users).forEach(function(users) {
                                        users.forEach(function(member) {
                                            if (member != client) {
                                                member.red(content);
                                            }
                                        });
                                    });
                                }
                                str = null;
                                client = null;
                            });
                        }
                    }
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}




var cuoc = async function(client, data) {
    if (!!data && !!data.bet) {

        try {
            if (client.redT.TaiXiu_time < 6 || client.redT.TaiXiu_time > 60) {
                client.red({ taixiu: { err: 'Vui lòng cược ở phiên sau.!!' } });
            } else {
                let bet = data.bet >> 0; // Số tiền
                let select = !!data.select; // Cửa đặt (Tài:1, Xỉu:0)

                if (bet < 1000) {
                    client.red({ taixiu: { err: 'Số tiền phải lớn hơn 1000.!!' } });
                } else {

                    UserInfo.findOne({ id: client.UID }, 'red name', async function(err, user) {

                        if (user === null || user.red < bet) {
                            client.red({ taixiu: { err: 'Bạn không đủ tiền để cược.!!' } });
                        } else {

                            // lấy ip người chơi
                            const ipUserFromDB = await Devices.findOne({ 'uid': client.UID }, 'ip').exec();
                            let ipAndress = (!!ipUserFromDB) ? ipUserFromDB.ip : '';


                            let phien = client.redT.TaiXiu_phien;
                            TXCuocOne.findOne({ uid: client.UID, phien: phien }, 'bet select', function(isCuocErr, isCuoc) {
                                if (!!isCuoc) {
                                    // update
                                    if (isCuoc.select !== select) {
                                        client.red({ taixiu: { err: 'Chỉ được cược 1 bên.!!' } });
                                    } else {

                                        if (bet >= 10000) {
                                            try {
                                                const betDoor = (select) ? "TÀI" : "XỈU";
                                                telegram(process.env.TELEGRAM_ALERT_GROUP, `${user.name.toUpperCase()}` + "\n" + `├ vừa cược thêm cửa ${betDoor}!!!` + "\n" + `└ số tiền: ${helpers.numberWithCommas(bet)}` + "\n");
                                            } catch (e) {
                                                console.log(e);
                                            }
                                        }

                                        // trừ tiền khi cược tiếp vào bên đã cược
                                        user.red -= bet;
                                        user.save();

                                        UserHistory.create({
                                            uid: client.UID,
                                            name: user.name,
                                            action: UserHistoryEnums.TAIXIU,
                                            transType: UserHistoryEnums.TRANS_MINUS,
                                            red: bet,
                                            balance: user.red * 1,
                                            description: 'Cược tài xỉu'
                                        });

                                        isCuoc.bet = isCuoc.bet * 1 + bet;
                                        isCuoc.save();

                                        var io = client.redT;

                                        if (select) {
                                            io.taixiu.taixiu.red_tai += bet;
                                            io.taixiuAdmin.taixiu.red_tai += bet;
                                        } else {
                                            io.taixiu.taixiu.red_xiu += bet;
                                            io.taixiuAdmin.taixiu.red_xiu += bet;
                                        }

                                        const newList = updateAdminDataBet(io.taixiuAdmin, client.UID, user.name, bet, Number(user.red.toString()), new Date(), ipAndress);
                                        io.taixiuAdmin.list = newList;

                                        io = null;
                                        TXCuoc.create({ uid: client.UID, name: user.name, phien: phien, bet: bet, select: select, time: new Date() });

                                        var taixiuVery = select ? { red_me_tai: isCuoc.bet } : { red_me_xiu: isCuoc.bet };
                                        taixiuVery = { taixiu: taixiuVery };
                                        if (!!client.redT.users[client.UID]) {
                                            client.redT.users[client.UID].forEach(function(obj) {
                                                obj.red({ taixiu: taixiuVery, user: { red: user.red } });
                                            });
                                        }
                                    }
                                } else {
                                    // trừ tiền khi chưa cược bên nào
                                    user.red -= bet;
                                    user.save();

                                    UserHistory.create({
                                        uid: client.UID,
                                        name: user.name,
                                        action: UserHistoryEnums.TAIXIU,
                                        transType: UserHistoryEnums.TRANS_MINUS,
                                        red: bet,
                                        balance: user.red * 1,
                                        description: 'Cược tài xỉu'
                                    });

                                    // cuoc
                                    var io = client.redT;
                                    if (select) {
                                        io.taixiu.taixiu.red_tai += bet;
                                        io.taixiu.taixiu.red_player_tai += 1;
                                        io.taixiuAdmin.taixiu.red_tai += bet;
                                        io.taixiuAdmin.taixiu.red_player_tai += 1;
                                    } else {
                                        io.taixiu.taixiu.red_xiu += bet;
                                        io.taixiu.taixiu.red_player_xiu += 1;
                                        io.taixiuAdmin.taixiu.red_xiu += bet;
                                        io.taixiuAdmin.taixiu.red_player_xiu += 1;
                                    }

                                    if (bet >= 10000) {
                                        try {
                                            const betDoor = (select) ? "TÀI" : "XỈU";
                                            telegram(process.env.TELEGRAM_ALERT_GROUP, `${user.name.toUpperCase()}` + "\n" + `├ vừa cược cửa ${betDoor}!!!` + "\n" + `└ số tiền: ${helpers.numberWithCommas(bet)}` + "\n");
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    }

                                    io.taixiuAdmin.list.unshift({ id: client.UID, name: user.name, select: select, bet: bet, balance: Number(user.red.toString()), time: new Date(), ip: ipAndress });
                                    io = null;
                                    TXCuocOne.create({ uid: client.UID, phien: phien, select: select, bet: bet });
                                    TXCuoc.create({ uid: client.UID, name: user.name, phien: phien, bet: bet, select: select, time: new Date() });
                                    var taixiuVery = select ? { red_me_tai: bet } : { red_me_xiu: bet };
                                    taixiuVery = { taixiu: taixiuVery };

                                    if (!!client.redT.users[client.UID]) {
                                        client.redT.users[client.UID].forEach(function(obj) {
                                            obj.red({ taixiu: taixiuVery, user: { red: user.red } });
                                        });
                                    }
                                }
                                bet = null;
                                select = null;
                                phien = null;
                                client = null;
                                user = null;
                            });
                        }
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}




var get_phien = async function(client, data) {
    if (!!data && !!data.phien) {
        // TXCuoc, TXPhien
        try {
            var phien = data.phien >> 0;

            let checkRedis = await redis.get(`taixiu:getphien:${phien}`);
            if (checkRedis) {
                client.red({ taixiu: { get_phien: checkRedis } });
                return;
            }

            var getPhien = await TXPhien.findOne({ id: phien }).exec();

            if (getPhien) {

                let dataT = {};
                var tong_L = 0;
                var tong_R = 0;
                var tong_tralai_L = 0;
                var tong_tralai_R = 0;

                var getCuoc = await TXCuoc.find({ phien: phien }, {}, { sort: { '_id': -1 } }).exec();

                if (!!getCuoc) {
                    dataT['phien'] = getPhien.id;
                    dataT['time'] = getPhien.time;
                    dataT['dice'] = [getPhien.dice1, getPhien.dice2, getPhien.dice3];

                    dataT['dataL'] = [];
                    dataT['dataR'] = [];

                    getCuoc.forEach((cuoc) => {
                        if (cuoc.select) {
                            tong_L += cuoc.bet;
                            tong_tralai_L += cuoc.tralai
                            delete cuoc.thanhtoan;
                            delete cuoc.win;
                            delete cuoc.betwin;
                            delete cuoc.bot;
                            delete cuoc._id;
                            delete cuoc.uid;
                            delete cuoc.phien;
                            delete cuoc.select;
                            delete cuoc.__v;
                            dataT['dataL'].push(cuoc);
                        } else {
                            tong_R += cuoc.bet;
                            tong_tralai_R += cuoc.tralai;
                            delete cuoc.thanhtoan;
                            delete cuoc.win;
                            delete cuoc.betwin;
                            delete cuoc.bot;
                            delete cuoc._id;
                            delete cuoc.uid;
                            delete cuoc.phien;
                            delete cuoc.select;
                            delete cuoc.__v;
                            dataT['dataR'].push(cuoc);
                        }
                    });

                    dataT['tong_L'] = tong_L;
                    dataT['tong_R'] = tong_R;
                    dataT['tong_tralai_L'] = tong_tralai_L;
                    dataT['tong_tralai_R'] = tong_tralai_R;
                    await redis.set(`taixiu:getphien:${phien}`, dataT);
                    client.red({ taixiu: { get_phien: dataT } });
                } else {
                    client.red({ notice: { title: 'LỖI', text: 'Không có ai cược tại phiên này...', load: false } });
                }
            } else {
                client.red({ notice: { title: 'LỖI', text: 'Phiên không tồn tại...', load: false } });
            }
        } catch (e) {
            console.log(e);
        }
    }
}



var get_log = function(client, data) {
    try {
        if (!!data && !!data.page) {
            var page = data.page >> 0;
            var kmess = 11;
            if (page > 0) {

                TXCuoc.countDocuments({ uid: client.UID, thanhtoan: true }).exec(function(err, total) {
                    TXCuoc.find({ uid: client.UID, thanhtoan: true }, {}, { sort: { '_id': -1 }, skip: (page - 1) * kmess, limit: kmess }, function(error, result) {
                        if (result.length) {
                            Promise.all(result.map(function(obj) {
                                    obj = obj._doc;
                                    var getPhien = TXPhien.findOne({ id: obj.phien }).exec();
                                    return Promise.all([getPhien]).then(values => {
                                        Object.assign(obj, values[0]._doc);
                                        delete obj.__v;
                                        delete obj._id;
                                        delete obj.thanhtoan;
                                        delete obj.id;
                                        delete obj.uid;
                                        return obj;
                                    });
                                }))
                                .then(function(arrayOfResults) {
                                    let dataExport = [];
                                    arrayOfResults.forEach((data) => {
                                        if (data.win) {
                                            data.betwin = data.bet + data.betwin;
                                        }
                                        dataExport.push(data);
                                    });
                                    client.red({ taixiu: { get_log: { data: dataExport, page: page, kmess: kmess, total: total } } });
                                    client = null;
                                    kmess = null;
                                    page = null;
                                    total = null;
                                });
                        } else {
                            client.red({ taixiu: { get_log: { data: [], page: page, kmess: 9, total: 0 } } });
                            page = null;
                            client = null;
                            kmess = null;
                        }
                    });
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
}










var get_top = async function(client, data) {
    try {
        if (!!data) {
            let checkRedis = await redis.get(`taixiu:gettop`);
            if (checkRedis) {
                client.red({ taixiu: { get_top: checkRedis } });
                return;
            }

            TaiXiu_User.find({ 'totall': { $gt: 0 } }, 'totall uid', { sort: { totall: -1 }, limit: 10 }, function(err, results) {
                Promise.all(results.map(function(obj) {
                        return new Promise(function(resolve, reject) {
                            UserInfo.findOne({ 'id': obj.uid }, function(error, result2) {
                                resolve({ name: !!result2 ? result2.name : '', bet: obj.totall });
                            })
                        })
                    }))
                    .then(async function(result) {
                        await redis.setex(`taixiu:gettop`, 60, result); // cache 60s
                        client.red({ taixiu: { get_top: result } });
                        client = null;
                    });
            });
        } else {
            client = null;
        }
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    getLogs: getLogs,
    chat: chat,
    cuoc: cuoc,
    get_phien: get_phien,
    get_log: get_log,
    get_top: get_top,
    getNew: getNew,
}
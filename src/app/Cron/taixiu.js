require('dotenv').config();
let Helpers = require('../Helpers/Helpers');
let UserInfo = require('../Models/UserInfo');
let TXPhien = require('../Models/TaiXiu_phien');
let TXCuoc = require('../Models/TaiXiu_cuoc');
let TaiXiu_User = require('../Models/TaiXiu_user');
let TXCuocOne = require('../Models/TaiXiu_one');
let TotalSpend = require('../Models/TotalSpend');

let UserHistory = require('../Models/UserHistory');
let UserHistoryEnums = require('../../config/userHistoryEnums');

let bot = require('./taixiu/bot');
let botList = [];
let botTemp = [];
let io = null;
let gameLoop = null;

function createResultTaiXiu(result) {
    while (true) {
        let dice1, dice2, dice3;
        dice1 = Helpers.randomInteger(1, 6);
        dice2 = Helpers.randomInteger(1, 6);
        dice3 = Helpers.randomInteger(1, 6);
        if (result) {
            if (dice1 + dice2 + dice3 > 10) return [dice1, dice2, dice3];
        } else {
            if (dice1 + dice2 + dice3 <= 10) return [dice1, dice2, dice3];
        }
    }
}


let init = function(obj) {
    io = obj;
    io.listBot = [];
    UserInfo.find({ type: true }, 'id name', function(err, list) {
        if (!!list && list.length) {
            io.listBot = list.map(function(user) {
                user = user._doc;
                delete user._id;
                return user;
            });
            list = null;
        }
    });

    io.taixiu = {
        taixiu: {
            red_player_tai: 0,
            red_player_xiu: 0,
            red_tai: 0,
            red_xiu: 0,
        }
    };

    io.taixiuAdmin = {
        taixiu: {
            red_player_tai: 0,
            red_player_xiu: 0,
            red_tai: 0,
            red_xiu: 0,
        },
        list: []
    };
    playGame();
}

TXPhien.findOne({}, 'id', { sort: { id: -1 } }, function(err, last) {
    if (!!last) {
        io.TaiXiu_phien = last.id + 1;
    }
})

let truChietKhau = function(bet, phe) {
    return bet - Math.ceil(bet * phe / 100);
}


let pushWinNotify = (user, bet) => {
    try {
        io.sendInHome({ news: { t: { game: 'Tài Xỉu', user, bet, status: 2 } } });
    } catch (e) {}
}


let setTaiXiu_user = async(phien, dice) => {
    let list = await TXCuocOne.find({ phien: phien }, {}).exec();
    if (list.length > 0) {
        let rewardExcute = 1;
        for (var obj of list) {
            const getTaixiuUSer = await TaiXiu_User.findOne({ uid: obj.uid, type: false }).exec();
            if (getTaixiuUSer !== null) {
                let bet_thua = obj.bet - obj.tralai;
                let bet = obj.win ? obj.betwin + obj.bet : bet_thua;
                let update = {};

                if (bet_thua >= 10000) {
                    update = {
                        tLineWinRed: obj.win && getTaixiuUSer.tLineWinRed < getTaixiuUSer.tLineWinRedH + 1 ? getTaixiuUSer.tLineWinRedH + 1 : getTaixiuUSer.tLineWinRed,
                        tLineLostRed: !obj.win && getTaixiuUSer.tLineLostRed < getTaixiuUSer.tLineLostRedH + 1 ? getTaixiuUSer.tLineLostRedH + 1 : getTaixiuUSer.tLineLostRed,
                        tLineWinRedH: obj.win ? getTaixiuUSer.tLineWinRedH + 1 : 0,
                        tLineLostRedH: obj.win ? 0 : getTaixiuUSer.tLineLostRedH + 1,
                        last: phien,
                    };
                    if (obj.win) {
                        if (getTaixiuUSer.tLineWinRedH == 0) {
                            update.first = phien;
                        }
                    } else {
                        if (getTaixiuUSer.tLineLostRedH == 0) {
                            update.first = phien;
                        }
                    }
                    TaiXiu_User.updateOne({ uid: obj.uid }, { $set: update }).exec();
                }

                if (obj.win) {
                    if (bet >= 2000000) {
                        pushWinNotify(getTaixiuUSer.name, bet);
                    }
                }

                if (io.users.hasOwnProperty(getTaixiuUSer.uid)) {
                    io.users[getTaixiuUSer.uid].forEach(function(client) {
                        client.red({ taixiu: { status: { win: obj.win, select: obj.select, bet: bet } } });
                    });
                };

                let tralai = (obj.tralai > 0) ? obj.tralai : 0;
                let tongcuoc = obj.bet - tralai;
                if (tongcuoc > 0) {
                    TotalSpend.findOneAndUpdate({ uid: obj.uid }, { $inc: { red: tongcuoc } }).exec();
                }
            } else {
                continue;
            }
            rewardExcute++;
        };
    }
}





let traThuong = async(game_id, dice = false) => {
    let list = await TXCuoc.find({ phien: game_id }, null).sort({ '_id': -1 }).exec();

    // default total tai - xiu
    let TaiXiu_red_tong_tai = 0;
    let TaiXiu_red_tong_xiu = 0;

    if (list.length) {
        list.forEach((objL) => {
            if (objL.select === true) { // Tổng Tiền Tài
                TaiXiu_red_tong_tai += objL.bet;
            } else if (objL.select === false) { // Tổng Tiền Xỉu
                TaiXiu_red_tong_xiu += objL.bet;
            }
        });

        let TaiXiu_tong_red_lech = Math.abs(TaiXiu_red_tong_tai - TaiXiu_red_tong_xiu);
        let TaiXiu_red_lech_tai = TaiXiu_red_tong_tai > TaiXiu_red_tong_xiu ? true : false;
        TaiXiu_red_tong_tai = null;
        TaiXiu_red_tong_xiu = null;

        let taskExcute = 1;

        for (var obj of list) {
            if (obj.select === true) { // Tổng Red Tài

                let win = dice > 10 ? true : false;

                if (TaiXiu_red_lech_tai && TaiXiu_tong_red_lech > 0) {
                    if (TaiXiu_tong_red_lech >= obj.bet) {
                        // Trả lại hoàn toàn
                        TaiXiu_tong_red_lech -= obj.bet
                            // trả lại hoàn toàn
                        obj.thanhtoan = true;
                        obj.win = win;
                        obj.tralai = obj.bet;
                        obj.save();

                        UserInfo.findOne({ id: obj.uid }, 'red name', function(err, user) {
                            if (!!user) {
                                UserHistory.create({
                                    uid: obj.uid,
                                    name: user.name,
                                    action: UserHistoryEnums.TAIXIU,
                                    transType: UserHistoryEnums.TRANS_PLUS,
                                    red: obj.bet,
                                    balance: user.red * 1 + obj.tralai,
                                    description: 'Hoàn tiền cân cửa phiên ' + game_id
                                });
                            }
                        });


                        !obj.bot && UserInfo.updateOne({ id: obj.uid }, { $inc: { red: obj.bet } }).exec();
                        TXCuocOne.updateOne({ uid: obj.uid, phien: game_id }, { $set: { win: win }, $inc: { tralai: obj.bet } }).exec();
                    } else {
                        // Trả lại 1 phần
                        let betPlay = obj.bet - TaiXiu_tong_red_lech;
                        let betwinP = 0;

                        obj.thanhtoan = true;
                        obj.win = win;
                        obj.tralai = TaiXiu_tong_red_lech;
                        TaiXiu_tong_red_lech = 0;

                        // biến động số dư
                        UserInfo.findOne({ id: obj.uid }, 'red name', function(err, user) {
                            if (!!user) {
                                UserHistory.create({
                                    uid: obj.uid,
                                    name: user.name,
                                    action: UserHistoryEnums.TAIXIU,
                                    transType: UserHistoryEnums.TRANS_PLUS,
                                    red: obj.tralai,
                                    balance: user.red * 1 + obj.tralai,
                                    description: 'Hoàn tiền phiên ' + game_id
                                });
                            }
                        });


                        if (win) {
                            // Thắng nhưng bị trừ tiền trả lại
                            // cộng tiền thắng
                            betwinP = truChietKhau(betPlay, 2);
                            obj.betwin = betwinP;
                            let redUpdate = obj.bet + betwinP;

                            !obj.bot && UserInfo.updateOne({ id: obj.uid }, { $inc: { totall: betwinP, red: redUpdate, redPlay: betPlay, redWin: betwinP } }).exec();
                            TaiXiu_User.updateOne({ uid: obj.uid }, { $inc: { totall: betwinP, tWinRed: betwinP, tRedPlay: betPlay } }).exec();

                        } else {

                            !obj.bot && UserInfo.updateOne({ id: obj.uid }, { $inc: { totall: -betPlay, red: obj.tralai, redPlay: betPlay, redLost: betPlay } }).exec();
                            TaiXiu_User.updateOne({ uid: obj.uid }, { $inc: { totall: -betPlay, tLostRed: betPlay, tRedPlay: betPlay } }).exec();
                        }
                        obj.save();
                        TXCuocOne.updateOne({ uid: obj.uid, phien: game_id }, { $set: { win: win }, $inc: { tralai: obj.tralai, betwin: betwinP } }).exec();
                    }
                } else {
                    if (win) {
                        // cộng tiền thắng hoàn toàn
                        let betwin = truChietKhau(obj.bet, 2);
                        obj.thanhtoan = true;
                        obj.win = true;
                        obj.betwin = betwin;
                        obj.save();

                        let redUpdate = obj.bet + betwin;

                        UserInfo.findOne({ id: obj.uid }, 'red name', function(err, user) {
                            if (!!user) {
                                UserHistory.create({
                                    uid: obj.uid,
                                    name: user.name,
                                    action: UserHistoryEnums.TAIXIU,
                                    transType: UserHistoryEnums.TRANS_PLUS,
                                    red: redUpdate,
                                    balance: user.red * 1 + redUpdate,
                                    description: 'Cộng tiền thắng phiên ' + game_id
                                });
                            }
                        });

                        !obj.bot && UserInfo.updateOne({ id: obj.uid }, { $inc: { totall: betwin, red: redUpdate, redWin: betwin, redPlay: obj.bet } }).exec();
                        TaiXiu_User.updateOne({ uid: obj.uid }, { $inc: { totall: betwin, tWinRed: betwin, tRedPlay: obj.bet } }).exec();
                        TXCuocOne.updateOne({ uid: obj.uid, phien: game_id }, { $set: { win: true }, $inc: { betwin: betwin } }).exec();
                    } else {
                        obj.thanhtoan = true;
                        obj.save();

                        !obj.bot && UserInfo.updateOne({ id: obj.uid }, { $inc: { totall: -obj.bet, redLost: obj.bet, redPlay: obj.bet } }).exec();
                        TaiXiu_User.updateOne({ uid: obj.uid }, { $inc: { totall: -obj.bet, tLostRed: obj.bet, tRedPlay: obj.bet } }).exec();
                    }
                }
            } else if (obj.select === false) { // Tổng Red Xỉu
                let win = dice > 10 ? false : true;
                if (!TaiXiu_red_lech_tai && TaiXiu_tong_red_lech > 0) {
                    if (TaiXiu_tong_red_lech >= obj.bet) {
                        // Trả lại hoàn toàn
                        TaiXiu_tong_red_lech -= obj.bet
                            // trả lại hoàn toàn
                        obj.thanhtoan = true;
                        obj.win = win;
                        obj.tralai = obj.bet;
                        obj.save();


                        UserInfo.findOne({ id: obj.uid }, 'red name', function(err, user) {
                            if (!!user) {
                                UserHistory.create({
                                    uid: obj.uid,
                                    name: user.name,
                                    action: UserHistoryEnums.TAIXIU,
                                    transType: UserHistoryEnums.TRANS_PLUS,
                                    red: obj.bet,
                                    balance: user.red * 1 + obj.tralai,
                                    description: 'Hoàn tiền cân cửa phiên ' + game_id
                                });
                            }
                        });

                        !obj.bot && UserInfo.updateOne({ id: obj.uid }, { $inc: { red: obj.bet } }).exec();
                        TXCuocOne.updateOne({ uid: obj.uid, phien: game_id }, { $set: { win: win }, $inc: { tralai: obj.bet } }).exec();
                    } else {
                        // Trả lại 1 phần
                        let betPlay = obj.bet - TaiXiu_tong_red_lech;
                        let betwinP = 0;

                        obj.thanhtoan = true;
                        obj.win = win;
                        obj.tralai = TaiXiu_tong_red_lech;
                        TaiXiu_tong_red_lech = 0;

                        UserInfo.findOne({ id: obj.uid }, 'red name', function(err, user) {
                            if (!!user) {
                                UserHistory.create({
                                    uid: obj.uid,
                                    name: user.name,
                                    action: UserHistoryEnums.TAIXIU,
                                    transType: UserHistoryEnums.TRANS_PLUS,
                                    red: obj.tralai,
                                    balance: user.red * 1 + obj.tralai,
                                    description: 'Hoàn tiền phiên ' + game_id
                                });
                            }
                        });


                        if (win) {
                            // Thắng nhưng bị trừ tiền trả lại
                            // cộng tiền thắng
                            betwinP = truChietKhau(betPlay, 2);
                            obj.betwin = betwinP;
                            let redUpdate = obj.bet + betwinP;

                            !obj.bot && UserInfo.updateOne({ id: obj.uid }, { $inc: { totall: betwinP, red: redUpdate, redPlay: betPlay, redWin: betwinP } }).exec();
                            TaiXiu_User.updateOne({ uid: obj.uid }, { $inc: { totall: betwinP, tWinRed: betwinP, tRedPlay: betPlay } }).exec();

                        } else {
                            !obj.bot && UserInfo.updateOne({ id: obj.uid }, { $inc: { totall: -betPlay, red: obj.tralai, redPlay: betPlay, redLost: betPlay } }).exec();
                            TaiXiu_User.updateOne({ uid: obj.uid }, { $inc: { totall: -betPlay, tLostRed: betPlay, tRedPlay: betPlay } }).exec();
                        }
                        obj.save();
                        TXCuocOne.updateOne({ uid: obj.uid, phien: game_id }, { $set: { win: win }, $inc: { tralai: obj.tralai, betwin: betwinP } }).exec();
                    }
                } else {
                    if (win) {
                        // cộng tiền thắng hoàn toàn
                        let betwin = truChietKhau(obj.bet, 2);
                        obj.thanhtoan = true;
                        obj.win = true;
                        obj.betwin = betwin;
                        obj.save();

                        let redUpdate = obj.bet + betwin;

                        UserInfo.findOne({ id: obj.uid }, 'red name', function(err, user) {
                            if (!!user) {
                                UserHistory.create({
                                    uid: obj.uid,
                                    name: user.name,
                                    action: UserHistoryEnums.TAIXIU,
                                    transType: UserHistoryEnums.TRANS_PLUS,
                                    red: redUpdate,
                                    balance: user.red * 1 + redUpdate,
                                    description: 'Cộng tiền thắng phiên ' + game_id
                                });
                            }
                        });

                        !obj.bot && UserInfo.updateOne({ id: obj.uid }, { $inc: { totall: betwin, red: redUpdate, redWin: betwin, redPlay: obj.bet } }).exec();
                        TaiXiu_User.updateOne({ uid: obj.uid }, { $inc: { totall: betwin, tWinRed: betwin, tRedPlay: obj.bet } }).exec();
                        TXCuocOne.updateOne({ uid: obj.uid, phien: game_id }, { $set: { win: true }, $inc: { betwin: betwin } }).exec();
                    } else {
                        obj.thanhtoan = true;
                        obj.save();

                        !obj.bot && UserInfo.updateOne({ id: obj.uid }, { $inc: { totall: -obj.bet, redLost: obj.bet, redPlay: obj.bet } }).exec();
                        TaiXiu_User.updateOne({ uid: obj.uid }, { $inc: { totall: -obj.bet, tLostRed: obj.bet, tRedPlay: obj.bet } }).exec();
                    }
                }
            }

            taskExcute++;
        };
        setTaiXiu_user(game_id, dice);
        TaiXiu_tong_red_lech = null;
        TaiXiu_red_lech_tai = null;
    }
    playGame();
}



let playGame = function() {
    io.TaiXiu_time = 75; //; 77;
    gameLoop = setInterval(function() {

        io.TaiXiu_time--;

        // CÂN CỬA
        if (io.TaiXiu_time == 5) {
            // Users
            let home;
            if (io.taixiu.taixiu.red_tai > io.taixiu.taixiu.red_xiu) {
                io.taixiu.taixiu.red_tai = io.taixiu.taixiu.red_xiu;
                home = { taixiu: { taixiu: { red_tai: io.taixiu.taixiu.red_tai, red_xiu: io.taixiu.taixiu.red_xiu }, err: 'Đang cân cửa' } };
            } else {
                io.taixiu.taixiu.red_xiu = io.taixiu.taixiu.red_tai;
                home = { taixiu: { taixiu: { red_tai: io.taixiu.taixiu.red_tai, red_xiu: io.taixiu.taixiu.red_xiu }, err: 'Đang cân cửa' } };
            }

            Object.values(io.users).forEach(function(users) {
                users.forEach(function(client) {
                    if (client.gameEvent !== void 0 && client.gameEvent.viewTaiXiu !== void 0 && client.gameEvent.viewTaiXiu) {
                        client.red(home);
                    } else if (client.scene == 'home') {
                        client.red(home);
                    }
                });
            });
        }


        if (io.TaiXiu_time <= 60) {
            if (io.TaiXiu_time < 0) {
                clearInterval(gameLoop);
                io.TaiXiu_time = 0;

                // lấy config admin
                let taixiujs = Helpers.getData('taixiu');
                // lấy config AI Mode
                let taixiuAiMode = Helpers.getDataContent('taixiuAiMode');

                if (!!taixiujs) {

                    let dice1, dice2, dice3; // tạo biến lưu trữ kết quả 3 con xúc xắc

                    if (taixiuAiMode == "0") {
                        dice1 = Helpers.randomInteger(1, 6);
                        dice2 = Helpers.randomInteger(1, 6);
                        dice3 = Helpers.randomInteger(1, 6);
                    } else {
                        if (taixiujs.dice1 !== 0 && taixiujs.dice2 !== 0 && taixiujs.dice2 !== 0) {
                            // admin đặt cửa
                            dice1 = parseInt(taixiujs.dice1 == 0 ? Math.floor(Math.random() * 6) + 1 : taixiujs.dice1);
                            dice2 = parseInt(taixiujs.dice2 == 0 ? Math.floor(Math.random() * 6) + 1 : taixiujs.dice2);
                            dice3 = parseInt(taixiujs.dice3 == 0 ? Math.floor(Math.random() * 6) + 1 : taixiujs.dice3);
                        } else {
                            // không đặt cửa
                            if (io.taixiuAdmin.taixiu.red_tai > io.taixiuAdmin.taixiu.red_xiu) {
                                let createResult = createResultTaiXiu(false);
                                dice1 = createResult[0];
                                dice2 = createResult[1];
                                dice3 = createResult[2];
                            } else if (io.taixiuAdmin.taixiu.red_xiu > io.taixiuAdmin.taixiu.red_tai) {
                                let createResult = createResultTaiXiu(true);
                                dice1 = createResult[0];
                                dice2 = createResult[1];
                                dice3 = createResult[2];
                            } else {
                                dice1 = Helpers.randomInteger(1, 6);
                                dice2 = Helpers.randomInteger(1, 6);
                                dice3 = Helpers.randomInteger(1, 6);
                            }
                        }
                    }

                    taixiujs.dice1 = 0;
                    taixiujs.dice2 = 0;
                    taixiujs.dice3 = 0;
                    taixiujs.uid = '';
                    taixiujs.rights = 2;
                    // set lại config tài xỉu, không đặt
                    Helpers.setData('taixiu', taixiujs);

                    TXPhien.create({ 'dice1': dice1, 'dice2': dice2, 'dice3': dice3, 'time': new Date() }, function(err, create) {
                        if (!!create) {
                            io.TaiXiu_phien = create.id + 1;
                            traThuong(create.id, dice1 + dice2 + dice3);
                            io.sendAllUser({ taixiu: { finish: { dices: [create.dice1, create.dice2, create.dice3], phien: create.id } } });

                            Object.values(io.admins).forEach((admin) => {
                                admin.forEach(function(client) {
                                    client.red({ taixiu: { finish: { dices: [create.dice1, create.dice2, create.dice3], phien: create.id } } });
                                    client = null;
                                });
                                admin = null;
                            });
                            dice1 = null;
                            dice2 = null;
                            dice3 = null;
                        }
                    });
                }


                io.taixiu = {
                    taixiu: {
                        red_player_tai: 0,
                        red_player_xiu: 0,
                        red_tai: 0,
                        red_xiu: 0,
                    }
                };
                io.taixiuAdmin = {
                    taixiu: {
                        red_player_tai: 0,
                        red_player_xiu: 0,
                        red_tai: 0,
                        red_xiu: 0,
                    },
                    list: []
                };

                let taixiucf = Helpers.getConfig('taixiu');

                if (!!taixiucf && taixiucf.bot && !!io.listBot && io.listBot.length > 0) {
                    // lấy danh sách tài khoản bot
                    botTemp = [...io.listBot];
                    botList = [...io.listBot];

                    let maxBot = botList.length;
                    botList = Helpers.shuffle(botList); // tráo
                    botList = botList.slice(0, maxBot);
                    maxBot = null;
                } else {
                    botTemp = [];
                    botList = [];
                }
            } else {

                // bắn thông tin tiền và thời gian của tài xỉu hiện tại
                let home = { taixiu: { taixiu: { red_tai: io.taixiu.taixiu.red_tai, red_xiu: io.taixiu.taixiu.red_xiu } } };

                Object.values(io.users).forEach((users) => {
                    users.forEach((client) => {
                        if (client.gameEvent !== void 0 && client.gameEvent.viewTaiXiu !== void 0 && client.gameEvent.viewTaiXiu) {
                            client.red({ taixiu: io.taixiu });
                        } else if (client.scene == 'home') {
                            client.red(home);
                        }
                        client = null;
                    });
                    users = null;
                });

                // Admin
                Object.values(io.admins).forEach((admin) => {
                    admin.forEach((client) => {
                        if (client.gameEvent !== void 0 && client.gameEvent.viewTaiXiu !== void 0 && client.gameEvent.viewTaiXiu) {
                            client.red({ taixiu: io.taixiuAdmin });
                        }
                        client = null;
                    });
                    admin = null;
                });

                // All Agency
                io.sendAllAgency({ taixiu: io.taixiuAdmin });

                // // Bắn thông tin cho khách chưa đăng nhập
                // if (!(io.TaiXiu_time % 10)) {
                //     io.sendAllClient(home);
                // }

                if (!!botList.length && io.TaiXiu_time > 6) {
                    let userCuoc = 0;
                    if (!((Math.random() * 3) >> 0)) {
                        userCuoc = (Math.random() * 16) >> 0;
                    } else {
                        userCuoc = (Math.random() * 10) >> 0;
                    }
                    let iH = 0;
                    for (iH = 0; iH < userCuoc; iH++) {
                        let dataT = botList[iH];
                        if (!!dataT) {
                            bot.tx(dataT, io);
                            botList.splice(iH, 1); // Xoá bot đã đặt tránh trùng lặp
                        }
                        dataT = null;
                    }
                }
            }
        }
    }, 1000);
    return gameLoop;
}

module.exports = init;
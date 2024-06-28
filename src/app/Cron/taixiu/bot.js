let TXCuoc = require('../../Models/TaiXiu_cuoc');
let TXCuocOne = require('../../Models/TaiXiu_one');
let moment = require('moment-timezone');
moment.tz.setDefault("Asia/Ho_Chi_Minh");

let periodEnums = {
    SANG: "morning",
    TRUA: "noon",
    CHIEU: "afternoon",
    TOI: "evening",
    DEM: "midnight"
}

let randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let createBet = (bot, io, period) => {
    try {
        let cuoc;
        let select = !!((Math.random() * 2) >> 0);
        let a = (Math.random() * 35) >> 0;

        // swich cuoc
        switch (period) {
            case periodEnums.SANG: // buổi sáng
                if (a == 34) {
                    // 34
                    cuoc = (Math.floor(Math.random() * (20 - 3 + 1)) + 3) * 40000;
                } else if (a >= 32 && a < 34) {
                    // 32 33
                    cuoc = (Math.floor(Math.random() * (20 - 5 + 1)) + 5) * 40000; // note
                } else if (a >= 30 && a < 32) {
                    // 30 31 32
                    cuoc = (Math.floor(Math.random() * (20 - 10 + 1)) + 10) * 40000; // note
                } else if (a >= 26 && a < 30) {
                    // 26 27 28 29
                    cuoc = (Math.floor(Math.random() * (100 - 10 + 1)) + 10) * 40000; // note
                } else if (a >= 21 && a < 26) {
                    // 21 22 23 24 25
                    cuoc = (Math.floor(Math.random() * (200 - 10 + 1)) + 10) * 40000; // note
                } else if (a >= 15 && a < 21) {
                    // 15 16 17 18 19 20
                    cuoc = (Math.floor(Math.random() * (10 - 5 + 1)) + 5) * 10000;
                } else if (a >= 8 && a < 15) {
                    // 8 9 10 11 12 13 14
                    cuoc = (Math.floor(Math.random() * (7 - 2 + 1)) + 2) * 10000;
                } else {
                    // 0 1 2 3 4 5 6 7
                    cuoc = (Math.floor(Math.random() * (100 - 10 + 1)) + 10) * 10000;
                }
                break;
            case periodEnums.TRUA: // buổi trưa
                if (a == 34) {
                    // 34
                    cuoc = (Math.floor(Math.random() * (20 - 3 + 1)) + 3) * 40000;
                } else if (a >= 32 && a < 34) {
                    // 32 33
                    cuoc = (Math.floor(Math.random() * (20 - 5 + 1)) + 5) * 40000; // note
                } else if (a >= 30 && a < 32) {
                    // 30 31 32
                    cuoc = (Math.floor(Math.random() * (20 - 10 + 1)) + 10) * 40000; // note
                } else if (a >= 26 && a < 30) {
                    // 26 27 28 29
                    cuoc = (Math.floor(Math.random() * (100 - 10 + 1)) + 10) * 40000; // note
                } else if (a >= 21 && a < 26) {
                    // 21 22 23 24 25
                    cuoc = (Math.floor(Math.random() * (200 - 10 + 1)) + 10) * 40000; // note
                } else if (a >= 15 && a < 21) {
                    // 15 16 17 18 19 20
                    cuoc = (Math.floor(Math.random() * (10 - 5 + 1)) + 5) * 20000;
                } else if (a >= 8 && a < 15) {
                    // 8 9 10 11 12 13 14
                    cuoc = (Math.floor(Math.random() * (7 - 2 + 1)) + 2) * 10000;
                } else {
                    // 0 1 2 3 4 5 6 7
                    cuoc = (Math.floor(Math.random() * (100 - 10 + 1)) + 10) * 10000;
                }
                break;
            case periodEnums.CHIEU: // buổi chiều  
                if (a == 34) {
                    // 34
                    cuoc = (Math.floor(Math.random() * (20 - 3 + 1)) + 3) * 50000;
                } else if (a >= 32 && a < 34) {
                    // 32 33
                    cuoc = (Math.floor(Math.random() * (20 - 5 + 1)) + 5) * 40000; // note
                } else if (a >= 30 && a < 32) {
                    // 30 31 32
                    cuoc = (Math.floor(Math.random() * (20 - 10 + 1)) + 10) * 40000; // note
                } else if (a >= 26 && a < 30) {
                    // 26 27 28 29
                    cuoc = (Math.floor(Math.random() * (100 - 10 + 1)) + 10) * 40000; // note
                } else if (a >= 21 && a < 26) {
                    // 21 22 23 24 25
                    cuoc = (Math.floor(Math.random() * (200 - 10 + 1)) + 10) * 40000; // note
                } else if (a >= 15 && a < 21) {
                    // 15 16 17 18 19 20
                    cuoc = (Math.floor(Math.random() * (10 - 5 + 1)) + 5) * 20000;
                } else if (a >= 8 && a < 15) {
                    // 8 9 10 11 12 13 14
                    cuoc = (Math.floor(Math.random() * (7 - 2 + 1)) + 2) * 10000;
                } else {
                    // 0 1 2 3 4 5 6 7
                    cuoc = (Math.floor(Math.random() * (100 - 10 + 1)) + 10) * 10000;
                }
                break;
            case periodEnums.TOI: // buổi tối  

                if (a == 34) {
                    // 34
                    cuoc = (Math.floor(Math.random() * (20 - 3 + 1)) + 3) * 500000;
                } else if (a >= 32 && a < 34) {
                    // 32 33
                    cuoc = (Math.floor(Math.random() * (20 - 5 + 1)) + 5) * 300000; // note
                } else if (a >= 30 && a < 32) {
                    // 30 31 32
                    cuoc = (Math.floor(Math.random() * (20 - 10 + 1)) + 10) * 300000; // note
                } else if (a >= 26 && a < 30) {
                    // 26 27 28 29
                    cuoc = (Math.floor(Math.random() * (100 - 10 + 1)) + 10) * 30000; // note
                } else if (a >= 21 && a < 26) {
                    // 21 22 23 24 25
                    cuoc = (Math.floor(Math.random() * (200 - 10 + 1)) + 10) * 30000; // note
                } else if (a >= 15 && a < 21) {
                    // 15 16 17 18 19 20
                    cuoc = (Math.floor(Math.random() * (10 - 5 + 1)) + 5) * 100000;
                } else if (a >= 8 && a < 15) {
                    // 8 9 10 11 12 13 14
                    cuoc = (Math.floor(Math.random() * (7 - 2 + 1)) + 2) * 100000;
                } else {
                    // 0 1 2 3 4 5 6 7
                    cuoc = (Math.floor(Math.random() * (100 - 10 + 1)) + 10) * 10000;
                }
                break;
            case periodEnums.DEM: // buổi đêm
                if (a == 34) {
                    // 34
                    cuoc = (Math.floor(Math.random() * (20 - 3 + 1)) + 3) * 30000;
                } else if (a >= 32 && a < 34) {
                    // 32 33
                    cuoc = (Math.floor(Math.random() * (20 - 5 + 1)) + 5) * 30000; // note
                } else if (a >= 30 && a < 32) {
                    // 30 31 32
                    cuoc = (Math.floor(Math.random() * (20 - 10 + 1)) + 10) * 40000; // note
                } else if (a >= 26 && a < 30) {
                    // 26 27 28 29
                    cuoc = (Math.floor(Math.random() * (100 - 10 + 1)) + 10) * 40000; // note
                } else if (a >= 21 && a < 26) {
                    // 21 22 23 24 25
                    cuoc = (Math.floor(Math.random() * (200 - 10 + 1)) + 10) * 40000; // note
                } else if (a >= 15 && a < 21) {
                    // 15 16 17 18 19 20
                    cuoc = (Math.floor(Math.random() * (10 - 5 + 1)) + 5) * 10000;
                } else if (a >= 8 && a < 15) {
                    // 8 9 10 11 12 13 14
                    cuoc = (Math.floor(Math.random() * (7 - 2 + 1)) + 2) * 10000;
                } else {
                    // 0 1 2 3 4 5 6 7
                    cuoc = (Math.floor(Math.random() * (100 - 10 + 1)) + 10) * 10000;
                }
                break;
            default:
                cuoc = 1000;
                return;
                break;
        }

        // bet door
        switch (period) {
            case periodEnums.SANG: // buổi sáng
                if (select) {
                    io.taixiu.taixiu.red_tai += cuoc;
                    let randData = randomInteger(1, 10);
                    if (randData >= 9) {
                        io.taixiu.taixiu.red_player_tai += 2;
                    } else if (randData >= 7 && randData < 9) {
                        io.taixiu.taixiu.red_player_tai += 2;
                    } else {
                        io.taixiu.taixiu.red_player_tai += 2;
                    }
                } else {
                    io.taixiu.taixiu.red_xiu += cuoc;
                    let randData = randomInteger(1, 10);
                    if (randData >= 9) {
                        io.taixiu.taixiu.red_player_xiu += 2;
                    } else if (randData >= 7 && randData < 9) {
                        io.taixiu.taixiu.red_player_xiu += 2;
                    } else {
                        io.taixiu.taixiu.red_player_xiu += 2;
                    }
                }
                break;
            case periodEnums.TRUA: // buổi trưa
                if (select) {
                    io.taixiu.taixiu.red_tai += cuoc;
                    let randData = randomInteger(1, 10);
                    if (randData > 9) {
                        io.taixiu.taixiu.red_player_tai += 2;
                    } else if (randData >= 7 && randData <= 9) {
                        io.taixiu.taixiu.red_player_tai += 2;
                    } else {
                        io.taixiu.taixiu.red_player_tai += 2;
                    }
                } else {
                    io.taixiu.taixiu.red_xiu += cuoc;
                    let randData = randomInteger(1, 10);
                    if (randData > 9) {
                        io.taixiu.taixiu.red_player_xiu += 2;
                    } else if (randData >= 7 && randData <= 9) {
                        io.taixiu.taixiu.red_player_xiu += 1;
                    } else {
                        io.taixiu.taixiu.red_player_xiu += 2;
                    }
                }
                break;
            case periodEnums.CHIEU: // buổi chiều  
                if (select) {
                    io.taixiu.taixiu.red_tai += cuoc;
                    let randData = randomInteger(1, 10);
                    if (randData > 9) {
                        io.taixiu.taixiu.red_player_tai += 2;
                    } else if (randData >= 5 && randData <= 9) {
                        io.taixiu.taixiu.red_player_tai += 2;
                    } else {
                        io.taixiu.taixiu.red_player_tai += 2;
                    }
                } else {
                    io.taixiu.taixiu.red_xiu += cuoc;
                    let randData = randomInteger(1, 10);
                    if (randData > 9) {
                        io.taixiu.taixiu.red_player_xiu += 2;
                    } else if (randData >= 5 && randData <= 9) {
                        io.taixiu.taixiu.red_player_xiu += 2;
                    } else {
                        io.taixiu.taixiu.red_player_xiu += 2;
                    }
                }
                break;
            case periodEnums.TOI: // buổi tối  
                if (select) {
                    io.taixiu.taixiu.red_tai += cuoc;
                    let randData = randomInteger(1, 10);
                    if (randData >= 9) {
                        io.taixiu.taixiu.red_player_tai += randomInteger(4, 7);
                    } else if (randData >= 7 && randData < 9) {
                        io.taixiu.taixiu.red_player_tai += randomInteger(1, 5);
                    } else {
                        io.taixiu.taixiu.red_player_tai += 2;
                    }
                } else {
                    io.taixiu.taixiu.red_xiu += cuoc;
                    let randData = randomInteger(1, 10);
                    if (randData >= 9) {
                        io.taixiu.taixiu.red_player_xiu += randomInteger(4, 7);
                    } else if (randData >= 7 && randData < 9) {
                        io.taixiu.taixiu.red_player_xiu += randomInteger(1, 5);
                    } else {
                        io.taixiu.taixiu.red_player_xiu += 2;
                    }
                }
                break;
            case periodEnums.DEM: // buổi đêm
                if (select) {
                    io.taixiu.taixiu.red_tai += cuoc;
                    let randData = randomInteger(1, 10);
                    if (randData >= 9) {
                        io.taixiu.taixiu.red_player_tai += 2;
                    } else if (randData >= 7 && randData < 9) {
                        io.taixiu.taixiu.red_player_tai += 2;
                    } else {
                        io.taixiu.taixiu.red_player_tai += 2;
                    }
                } else {
                    io.taixiu.taixiu.red_xiu += cuoc;
                    let randData = randomInteger(1, 10);
                    if (randData >= 9) {
                        io.taixiu.taixiu.red_player_xiu += 2;
                    } else if (randData >= 7 && randData < 9) {
                        io.taixiu.taixiu.red_player_xiu += 2;
                    } else {
                        io.taixiu.taixiu.red_player_xiu += 2;
                    }
                }
                break;
            default:
                break;
        }

        // create  data bet
        TXCuocOne.create({ uid: bot.id, phien: io.TaiXiu_phien, select, bet: cuoc });
        TXCuoc.create({ uid: bot.id, bot: true, name: bot.name, phien: io.TaiXiu_phien, bet: cuoc, select, time: new Date() });
        // reset data bet
        bot = null;
        io = null;
        cuoc = null;
        select = null;

    } catch (e) {
        console.log("Err Random Bet Taixiu: " + e.message);
        return;
    }
}

/**
 * Cược
 */
// Tài Xỉu RED
let tx = function(bot, io) {
    createBet(bot, io, periodEnums.TOI);
    return;
    
    //sang 6 - 9 // bình thường , mỗi bên 120 người, 90 - 120m
    //trua 10 - 15 // trung bình, mỗi bên 150 người, 120 - 150m
    //chieu 16 - 19 // trung bình, mỗi bên 170 - 210 người, 150 - 210m
    //toi 19 - 1 // cao , mỗi bên full bot
    // dem 1 - 6 // thấp, mỗi bên <= 100 người, 90 - 120m


    // GET CURRENT HOUR 
    const currenthour = moment();
    const nowHour = currenthour.hour();
    // buoi sang
    if (nowHour >= 6 && nowHour <= 9) {
        createBet(bot, io, periodEnums.SANG);
        return;
    }

    // buoi trua
    if (nowHour >= 10 && nowHour <= 15) {
        createBet(bot, io, periodEnums.TRUA);
        return;
    }

    // buoi chieu
    if (nowHour >= 16 && nowHour <= 19) {
        createBet(bot, io, periodEnums.CHIEU);
        return;
    }

    // buoi toi
    if (nowHour >= 19) {
        createBet(bot, io, periodEnums.TOI);
        return;
    }
    // buoi toi
    if (nowHour <= 1) {
        createBet(bot, io, periodEnums.TOI);
        return;
    }

    // buoi dem
    if (nowHour >= 2 && nowHour <= 5) {
        createBet(bot, io, periodEnums.DEM);
        return;
    }
};

module.exports = {
    tx: tx,
}
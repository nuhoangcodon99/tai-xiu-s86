let XocXoc_phien = require('../../../Models/XocXoc/XocXoc_phien');
let XocXoc_chat = require('../../../Models/XocXoc/XocXoc_chat');
let XocXoc_cuoc = require('../../../Models/XocXoc/XocXoc_cuoc');
let telegram = require('../../../Helpers/Telegram');
let UserInfo = require('../../../Models/UserInfo');

const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function(client) {
    let xocxoc = client.redT.game.xocxoc;
    if (xocxoc.clients[client.UID] === client) {

        UserInfo.findOne({ 'id': client.UID }, 'name red', function(err, user) {
            if (!!user) {
                if (user.red >= 300000) {
                    try {
                        telegram(process.env.TELEGRAM_XOCDIA_GROUP, ` XÓC ĐĨA: ${user.name}` + "\n" + `vừa VÀO game!`);
                    } catch (e) {}
                }
            }
        });

        let phien = xocxoc.phien;
        // Lấy thông tin phòng
        let data = {};
        data.time = xocxoc.time;
        data.data = xocxoc.data;
        data.chip = xocxoc.chip;
        data.client = Object.keys(xocxoc.clients).length + xocxoc.botCount + randomInteger(80, 125);

        var active1 = new Promise((resolve, reject) => {
            XocXoc_phien.find({}, 'red1 red2 red3 red4', { sort: { '_id': -1 }, limit: 48 }, function(err, logs) {
                Promise.all(logs.map(function(log) {
                        log = log._doc;
                        delete log._id;
                        return log;
                    }))
                    .then(function(result) {
                        resolve(result);
                    })
            });
        });

        var active2 = new Promise((resolve, reject) => {
            XocXoc_chat.find({}, 'name value', { sort: { '_id': -1 }, limit: 20 }, function(err, chats) {
                Promise.all(chats.map(function(chat) {
                        chat = chat._doc;
                        delete chat._id;
                        return chat;
                    }))
                    .then(function(result) {
                        resolve(result);
                    })
            });
        });

        var active3 = new Promise((resolve, reject) => {
            XocXoc_cuoc.find({ phien: phien }, 'bet type', { sort: { '_id': -1 } }, function(err, phiens) {
                Promise.all(phiens.map(function(phien) {
                        phien = phien._doc;
                        delete phien._id;
                        return phien;
                    }))
                    .then(function(result) {
                        resolve(result);
                    })
            });
        });

        Promise.all([active1, active2, active3]).then(values => {
            data.logs = values[0];
            data.chats = values[1];
            data.cuoc = values[2];
            data.me = {};
            if (xocxoc.ingame.red[client.profile.name]) {
                data.me.red = xocxoc.ingame.red[client.profile.name]
            }
            client.red({ xocxoc: { ingame: data } });
            values = null;
            data = null;
            client = null;
            xocxoc = null;
        });
    } else {
        // trở lại màn hình trang chủ
        client.red({ toGame: 'MainGame' });
        client = null;
        xocxoc = null;
    }
};
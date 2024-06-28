let UserInfo = require('../../../Models/UserInfo');
let telegram = require('../../../Helpers/Telegram');
const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function(client) {
    try {
        let xocxoc = client.redT.game.xocxoc;
        if (xocxoc.clients[client.UID] === client) {

            UserInfo.findOne({ 'id': client.UID }, 'name', function(err, user) {
                if(!!user) {
                    try {
                        telegram(process.env.TELEGRAM_XOCDIA_GROUP, ` XÓC ĐĨA: ${user.name}` + "\n" + `vừa THOÁT game!`);
                    }catch(e) {}				
                }
            });

            delete xocxoc.clients[client.UID];

            let clients = Object.keys(xocxoc.clients).length + xocxoc.botCount + randomInteger(80, 125);
            Object.values(xocxoc.clients).forEach(function(users) {
                if (client !== users) {
                    users.red({ xocxoc: { ingame: { client: clients } } });
                }
            });
        }
        xocxoc = null;
        client = null;
    } catch (e) {}
};
let botHu = require('../app/Cron/bot_hu');
let UserInfo = require('../app/Models/UserInfo');
let botList = [];
let limitBotUser = 30;

module.exports = async (redT) => {
    try {
        io = redT;
        io.listBotHu = [];
        let getUserBot = await UserInfo.aggregate(
            [{ $sample: { size: limitBotUser } }]
        );
        if (!!getUserBot && getUserBot.length) {
            io.listBotHu = getUserBot;
            getUserBot = null;
        }
        botList = [...io.listBotHu];
        botHu(io, botList);
    } catch (e) {
        console.log(e.message);
    }
}
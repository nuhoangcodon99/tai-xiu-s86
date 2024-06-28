let TXBotChat = require('../Models/TaiXiu_bot_chat');
const fs = require('fs')

module.exports = async(status) => {
    if (!status) return;
    try {
        let allText = fs.readFileSync(process.cwd() + '/src/data/dataFiles/contentBot.txt', 'utf8');
        const dataText = allText.split("\n");
        for (const content of dataText) {
            const find = await TXBotChat.find({ 'Content': content });
            if (find.length == 0) {
                if (content !== null || content != "") {
                    TXBotChat.create({ 'Content': content }, (err, data) => {
                        if (err) {
                            console.log(err);
                            console.log(`can't init bot chat: ${content}`);
                        } else {
                            console.log(`init bot chat: ${content}`);
                        }
                    });
                }
            }
        };
    } catch (e) {
        console.log(`Err Init Content BotChat: ${e.message}`);
    }
}
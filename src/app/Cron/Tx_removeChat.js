let TXChat = require('../Models/TaiXiu_chat');

let removeChat = () => {
    try {
        let chatLogs = setInterval(async () => {
            const deleteChat = await TXChat.deleteMany().exec();
        }, 60000);
    } catch (e) {}
}

module.exports = removeChat;
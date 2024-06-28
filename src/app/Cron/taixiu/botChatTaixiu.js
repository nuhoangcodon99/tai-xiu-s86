let TXBotChat = require('../../Models/TaiXiu_bot_chat');
let Helpers = require('../../Helpers/Helpers');

let botchat = function(io) {
    botChat = setInterval(function() {
       let botListChat = io.listBot;
       Helpers.shuffle(botListChat);
       
       if (botListChat.length > 1) {
           TXBotChat.aggregate([
               { $sample: { size: 1 } }
           ]).exec(function(err, chatText) {
               try {
                   Helpers.shuffle(chatText);
                   Object.values(io.users).forEach(function(users) {
                       users.forEach(function(client) {
                           try {
                               var content = { taixiu: { chat: { message: { user: botListChat[0].name, value: chatText[0].Content } } } };
                               client.red(content);
                           }catch(e){}
                       });
                   });
               }catch(e){}

           });
       }
   }, 7000);
   return botChat;
}



module.exports = async(io) => {
    try {
        botchat(io);
    } catch (e) {
        console.log(e.message);
    }
}
let UserInfo = require('../Models/UserInfo');
let helpers = require('./Helpers');
let TcgService = require('./TcgService');
const TCG_DEFAULT_PASSWORD = "WinvipPassword";

module.exports = async(status) => {
    if (!status) return;
    try {
        const getUsers = await UserInfo.find({'type': false }, 'name').exec();

        let i = 1;
        for (const user of getUsers) {
            console.log("@=" + i + ": " + user.name, " =>    " + await TcgService.createUser(user.name, TCG_DEFAULT_PASSWORD));
        i++;
        }
        
    } catch (e) {
        console.log(`Err Init Bot User: ${e.message}`);
    }
}
let Users = require('../Models/Users');
let UserInfo = require('../Models/UserInfo');
let helpers = require('./Helpers');
const fs = require('fs');
const passwordDefault = "Galaxy9Club"

let UserMission = require('../Models/UserMission');
let TaiXiu_User = require('../Models/TaiXiu_user');
let MiniPoker_User = require('../Models/miniPoker/miniPoker_users');
let Bigbabol_User = require('../Models/BigBabol/BigBabol_users');
let VQRed_User = require('../Models/VuongQuocRed/VuongQuocRed_users');
let DMAnhung_User = require('../Models/DongMauAnhhung/DongMauAnhhung_users');
let BauCua_User = require('../Models/BauCua/BauCua_user');
let Mini3Cay_User = require('../Models/Mini3Cay/Mini3Cay_user');
let CaoThap_User = require('../Models/CaoThap/CaoThap_user');
let AngryBirds_user = require('../Models/AngryBirds/AngryBirds_user');
let Candy_user = require('../Models/Candy/Candy_user');
let Sexandzen_user = require('../Models/Sexandzen/Sexandzen_user');
let Daohaitac_user = require('../Models/Daohaitac/Daohaitac_user');
let LongLan_user = require('../Models/LongLan/LongLan_user');
let RoyAl_user = require('../Models/RoyAl/RoyAl_user');
let SieuXe_user = require('../Models/SieuXe/SieuXe_user');
let Zeus_user = require('../Models/Zeus/Zeus_user');
let Caoboi_user = require('../Models/Caoboi/Caoboi_user');
let XocXoc_user = require('../Models/XocXoc/XocXoc_user');
let TotalSpend = require('../Models/TotalSpend');
let RongHo_user = require('../Models/RongHo/RongHo_user');

module.exports = async(status) => {
    if (!status) return;
    try {
        let allText = fs.readFileSync(process.cwd() + '/src/data/dataFiles/botCreate.txt', 'utf8');
        const BotName = allText.split("\n");
        let totalBotCreatSuccess = 0;
        let totalBotCreatFail = 0;
        for (const name of BotName) {
            let username = name.toLowerCase();
            username = username.replace(/(\r\n|\n|\r|\\n)/gm, '');
            const checkUser = await Users.exists({ 'local.username': username });
            if (!checkUser) {
                const createUser = await Users.create({
                    'local.username': username,
                    'local.password': helpers.generateHash(passwordDefault),
                    'local.regDate': new Date()
                });

                if (createUser) {
                    const createUserInfo = await UserInfo.create({
                        'id': createUser._id,
                        'name': username,
                        'joinedOn': new Date(),
                        'red': 10000,
                        'type': true, // true là bot
                    });

                    TotalSpend.create({ 'uid': createUserInfo.id, 'name': createUserInfo.name, 'red': 0 });
                    TaiXiu_User.create({ 'uid': createUserInfo.id, name: createUserInfo.name, type: false });
                    MiniPoker_User.create({ 'uid': createUserInfo.id });
                    Bigbabol_User.create({ 'uid': createUserInfo.id });
                    VQRed_User.create({ 'uid': createUserInfo.id });
                    DMAnhung_User.create({ 'uid': createUserInfo.id });
                    BauCua_User.create({ 'uid': createUserInfo.id });
                    Mini3Cay_User.create({ 'uid': createUserInfo.id });
                    CaoThap_User.create({ 'uid': createUserInfo.id });
                    AngryBirds_user.create({ 'uid': createUserInfo.id });
                    RongHo_user.create({ 'uid': createUserInfo.id });
                    Candy_user.create({ 'uid': createUserInfo.id });
                    Sexandzen_user.create({ 'uid': createUserInfo.id });
                    Daohaitac_user.create({ 'uid': createUserInfo.id });
                    LongLan_user.create({ 'uid': createUserInfo.id });
                    RoyAl_user.create({ 'uid': createUserInfo.id });
                    SieuXe_user.create({ 'uid': createUserInfo.id });
                    Zeus_user.create({ 'uid': createUserInfo.id });
                    Caoboi_user.create({ 'uid': createUserInfo.id });
                    XocXoc_user.create({ 'uid': createUserInfo.id });
                }
                console.log(`Created Bot: ${username}`);
                totalBotCreatSuccess++;
            } else {
                totalBotCreatFail++;
            }
        };

        console.log(`BOT: Create Success: ${totalBotCreatSuccess}`);
        console.log(`BOT: Create Fail: ${totalBotCreatFail}`);

    } catch (e) {
        console.log(`Err Init Bot User: ${e.message}`);
    }
}
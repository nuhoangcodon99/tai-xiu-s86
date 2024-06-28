var fs = require('fs');
let SysInformation = require('../Models/System/Sys_Information');
let SysGameStatus = require('../Models/System/Sys_GameStatus');

let getDataSettings = () => {
    const contents = fs.readFileSync(process.cwd() + '/src/config/systemDefault.json', 'utf8');
    const json = JSON.parse(contents);
    return json;
}

module.exports = async () => {
    try {
        const dataSettings = getDataSettings();
        const information = dataSettings.infomation;
        const gameStatus = dataSettings.gameStatus;

        // init infomation
        Object.keys(information).forEach(async (key) => {
            const checkExitsKey = await SysInformation.findOne({ key }).select("_id").lean();
            if (!checkExitsKey) {
                const newInfo = new SysInformation({
                    key,
                    value: information[key]
                });
                await newInfo.save();
                console.log("Init Information: " + key);
            } else { }
        });

        // init gameStatus
        Object.keys(gameStatus).forEach(async (key) => {
            const checkExitsKey = await SysGameStatus.findOne({ key }).select("_id").lean();
            if (!checkExitsKey) {
                const newInfo = new SysGameStatus({
                    key,
                    value: gameStatus[key]
                });
                await newInfo.save();
                console.log("Init Game Status: " + key);
            } else { }
        });
    } catch (e) {
        console.log(`Err Init Data System: ${ e.message }`);
    }
}
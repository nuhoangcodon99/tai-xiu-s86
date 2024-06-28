let SysInformation = require('./Models/System/Sys_Information');
let SysGameStatus = require('./Models/System/Sys_GameStatus');
let MomoConfig = require('./Models/Momo/MomoConfig');
const axios = require('axios');

module.exports = async (redT) => {
    try {
        let getMomoConfig = async () => {
            try {
                let getData = await axios({
                    method: 'get',
                    url: 'https://ft.1spay.online/api/momo/info?name=ft90&key=62960bb37579ae8bdddee5786e4d599b',
                    headers: {}
                });

                getData = getData.data;
                if (!!getData) {
                    if (getData.data !== null) {
                        const momo = getData.data[0];
                        return {
                            phone: momo.phone,
                            name: momo.name,
                            capset: momo.capset,
                            recei: momo.recei,		
                            errCode: null
                        }
                    }else {
                        return {
                            phone: 'xxxxxxxx',
                            name: 'xxxxxxxx',
                            errCode: 'config null data'
                        }
                    }
                } else {
                    return {
                        phone: 'xxxxxxxx',
                        name: 'xxxxxxxx',
                        errCode: 'err get config request'
                    }
                }
            }catch(e) {
                return {
                    phone: 'xxxxxxxx',
                    name: 'xxxxxxxx',
                    errCode: e.message
                }
            }
        }




        let getDataSys = async (models, key) => {
            try {
                const getData = await models.findOne({ key });
                if (!!getData) {
                    return getData.value;
                } else {
                    return null;
                }
            } catch (e) {
                console.log(e);
            }
        };
        const data = {
            initApp: {
                information: {
                    version: await getDataSys(SysInformation, "version"),
                    telegram: await getDataSys(SysInformation, "telegram"),
                    telegramBot: await getDataSys(SysInformation, "telegramBot"),
                    telesupport: await getDataSys(SysInformation, "telesupport"),
                    zalo: await getDataSys(SysInformation, "zalo"),
                    fanpage: await getDataSys(SysInformation, "fanpage"),
                    quickChat: await getDataSys(SysInformation, "quickChat"),
                    ios: await getDataSys(SysInformation, "ios"),
                    android: await getDataSys(SysInformation, "android"),
                },
                gameStatus: {
                    taixiu: await getDataSys(SysGameStatus, "taixiu"),
                    xocxoc: await getDataSys(SysGameStatus, "xocxoc"),
                    rongho: await getDataSys(SysGameStatus, "rongho"),
                    baucua: await getDataSys(SysGameStatus, "baucua"),
                    lode: await getDataSys(SysGameStatus, "lode"),
                    kbet: await getDataSys(SysGameStatus, "kbet"),
                    pocker: await getDataSys(SysGameStatus, "pocker"),
                    candy: await getDataSys(SysGameStatus, "candy"),
                    bacay: await getDataSys(SysGameStatus, "bacay"),
                    caothap: await getDataSys(SysGameStatus, "caothap"),
                    minipoker: await getDataSys(SysGameStatus, "minipoker"),
                    pubg: await getDataSys(SysGameStatus, "pubg"),
                    casinoroyale: await getDataSys(SysGameStatus, "casinoroyale"),
                    sieuxe: await getDataSys(SysGameStatus, "sieuxe"),
                    avengers: await getDataSys(SysGameStatus, "avengers"),
                    panda: await getDataSys(SysGameStatus, "panda"),
                    lmht: await getDataSys(SysGameStatus, "lmht"),
                    banca: await getDataSys(SysGameStatus, "banca"),
                    mienvientay: await getDataSys(SysGameStatus, "mienvientay"),
                    dongmauanhhung: await getDataSys(SysGameStatus, "dongmauanhhung"),
                    //frozen: await getDataSys(SysGameStatus, "frozen"),
                    frozen: false,
                    daihaitrinh: await getDataSys(SysGameStatus, "daihaitrinh"),
                    cowboy: await getDataSys(SysGameStatus, "cowboy"),
                    tamhung: await getDataSys(SysGameStatus, "tamhung"),
                    momo: await getDataSys(SysGameStatus, "momo"),
                },
                momo: await getMomoConfig()
            }
        };
        redT.send(JSON.stringify(data));

        const notifyPin = await getDataSys(SysInformation, "notifyPin");
        if (notifyPin != "") {
            try {
                contentNotify = JSON.parse(notifyPin);
                redT.send(JSON.stringify({
                    news: {
                        thongbao: contentNotify
                    }
                }));
            } catch (e) { }
        }
    } catch (e) {
        console.log(e.message);
    }
}